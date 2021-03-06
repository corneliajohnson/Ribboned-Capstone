import React, { useState, useRef, useContext, useEffect } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import { RibbonContext } from "../../providers/RibbonProvider";
import { SnagList } from "../snag/SnagList";
import { SnagAddButton } from "../snag/SnagAddButton";
import { Button, Popover, PopoverHeader, PopoverBody } from "reactstrap";
import { RibbonTrashMove } from "./RibbonTrashMove";
import Moment from "react-moment";
import "./Ribbon.css";
import { RibbonRestore } from "./RibbonRestore";
import { RibbonDelete } from "./RibbonDelete";
import { Link } from "react-router-dom";
import Logo from "../../img/RibbonedWordOnly.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const RibbonDetail = () => {
  const { getRibbonById } = useContext(RibbonContext);
  const [ribbon, setRibbon] = useState({});
  const [snags, setSnags] = useState([]);
  const [showDescription, setShowDecription] = useState(true);
  const { ribbonId } = useParams();

  //for management popover
  const [popoverOpen, setPopoverOpen] = useState(false);
  const toggle = () => setPopoverOpen(!popoverOpen);

  useEffect(() => {
    getRibbonById(ribbonId).then((response) => {
      setRibbon(response);
      setSnags(response.snags);
    });
  }, []);

  const [state, setState] = useState({
    playing: false,
    paused: false,
    duration: 0,
  });
  const [timeDisplayFormat, setTimeDisplayformat] = useState("normal");

  const { playing } = state;
  const { paused } = state;

  //refs
  const playerRef = useRef(null);
  const canvasRef = useRef(null);

  //play pause toggle
  const handlePause = () => {
    setState({ ...state, playing: false });
  };

  const handlePlay = () => {
    setState({ ...state, playing: true });
  };

  //format time
  const format = (seconds) => {
    if (isNaN(seconds)) {
      return "00:00";
    }

    //set formatting
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, "0");

    if (hh) {
      return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;
    }
    return `${mm}:${ss}`;
  };

  //get the seconds played
  const handleProgress = (changeState) => {
    if (!state.seeking) {
      setState({ ...state, ...changeState });
      //format seconds
      const time = format(changeState.playedSeconds);
      setTimeDisplayformat(time);
    }
  };

  const handleSeekChange = (e, newValue) => {
    console.log({ newValue });
    setState({ ...state, played: parseFloat(newValue / 100) });
  };

  //togle decription
  const toggleDecription = () => {
    if (showDescription) {
      setShowDecription(false);
    } else {
      setShowDecription(true);
    }
  };

  return (
    <>
      <div className="container">
        <ToastContainer></ToastContainer>
        <div className="row d-flex mt-1">
          <Button className="ml-auto" id="Popover1" type="button">
            Manage Ribbon
          </Button>
          <Popover
            placement="bottom"
            isOpen={popoverOpen}
            target="Popover1"
            toggle={toggle}
          >
            <PopoverHeader>Manage Ribbon</PopoverHeader>
            {ribbon.isActive ? (
              <PopoverBody>
                <Link to={`/ribbon/edit/${ribbon.id}`}>
                  <Button>Edit</Button>
                </Link>{" "}
                <RibbonTrashMove ribbon={ribbon} />
              </PopoverBody>
            ) : (
              <PopoverBody>
                <RibbonRestore ribbon={ribbon} />{" "}
                <RibbonDelete ribbon={ribbon} />
              </PopoverBody>
            )}
          </Popover>
        </div>
        <div className="text-center">
          <Link className="m-5" to="/account">
            <img alt="ribboned logo" src={Logo} />
          </Link>
        </div>
        <div className="row">
          <h1 className="text-center m-4 mx-auto">{ribbon.title}</h1>
        </div>
        <div>
          <div className="d-flex justify-content-center">
            <ReactPlayer
              onSeek={handleSeekChange}
              ref={playerRef}
              onPause={handlePause}
              playing={playing}
              onProgress={handleProgress}
              controls={true}
              url={ribbon.url}
            />
          </div>
          <div className="mx-auto w-75 font-weight-bold">
            {" "}
            <p className={showDescription ? "" : "hide-decription"}>
              {ribbon.decription}
            </p>{" "}
            <a href="#" className="float-right" onClick={toggleDecription}>
              {showDescription ? "Hide Decription" : "Show Decription"}
            </a>
          </div>
          <div className="text-muted mx-auto w-75">
            Ribbion Created:{" "}
            <Moment format=" MMM D, YYYY" withTitle>
              {ribbon.createdDateTime}
            </Moment>
            <p>
              {ribbon.category?.name}
              <span className="float-right">
                {ribbon.isPublic ? (
                  <span className="text-success">Public</span>
                ) : (
                  <span className="text-danger">Private</span>
                )}
              </span>
            </p>
          </div>
          <div className="text-center m-3">
            <SnagAddButton
              playerRef={playerRef}
              timeDisplayFormat={timeDisplayFormat}
              handlePlay={handlePlay}
              handlePause={handlePause}
              playing={playing}
              ribbonId={ribbon.id}
            />
          </div>
          <SnagList
            playerRef={playerRef}
            handlePlay={handlePlay}
            timeDisplayFormat={timeDisplayFormat}
            snags={snags}
            playing={playing}
          />
        </div>
        <canvas ref={canvasRef} />
      </div>
    </>
  );
};
