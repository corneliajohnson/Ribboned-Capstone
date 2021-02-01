import React, { useState, useRef, useContext, useEffect } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import { RibbonContext } from "../../providers/RibbonProvider";
import { SnagList } from "../snag/SnagList";
import { SnagAddButton } from "../snag/SnagAddButton";
import { Button, Popover, PopoverHeader, PopoverBody } from "reactstrap";
import { RibbonTrashMove } from "./RibbonTrashMove";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import "./Ribbon.css";
import { RibbonRestore } from "./RibbonRestore";

export const RibbonDetail = () => {
  const { getRibbonById } = useContext(RibbonContext);
  const [ribbon, setRibbon] = useState({});
  const [showDescription, setShowDecription] = useState(true);
  const { ribbonId } = useParams();

  //for management popover
  const [popoverOpen, setPopoverOpen] = useState(false);
  const toggle = () => setPopoverOpen(!popoverOpen);

  useEffect(() => {
    getRibbonById(ribbonId).then((response) => {
      setRibbon(response);
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
  const handlePlayPause = () => {
    setState({ ...state, playing: !state.playing });
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
        <div>
          <Button className="float-right" id="Popover1" type="button">
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
                </Link>
                <RibbonTrashMove ribbon={ribbon} />
              </PopoverBody>
            ) : (
              <PopoverBody>
                <RibbonRestore ribbon={ribbon} />
                <RibbonTrashMove ribbon={ribbon} />
              </PopoverBody>
            )}
          </Popover>
        </div>
        <h1 className="text-center w-75 mx-auto">{ribbon.title}</h1>
        <div>
          <div className="d-flex justify-content-center">
            <ReactPlayer
              onSeek={handleSeekChange}
              ref={playerRef}
              onPause={paused}
              playing={playing}
              onProgress={handleProgress}
              controls={true}
              url={ribbon.url}
            />
          </div>
          <div>
            {" "}
            <p
              className={
                showDescription
                  ? "mx-auto w-75 font-weight-bold"
                  : "hide-decription"
              }
            >
              {ribbon.decription}
            </p>{" "}
            <a
              className="mx-auto w-50 float-right"
              href="#"
              onClick={toggleDecription}
            >
              {showDescription ? "Hide Decription" : "Show Decription"}
            </a>
          </div>
          <div className="text-muted mx-auto w-75">
            Ribbion Created:{" "}
            <Moment format=" MMM D, YYYY" withTitle>
              {ribbon.createdDateTime}
            </Moment>
            <p>{ribbon.category?.name}</p>
          </div>
          <div className="text-center m-3">
            <SnagAddButton
              handlePlayPause={handlePlayPause}
              playerRef={playerRef}
            />
          </div>
          <SnagList
            playerRef={playerRef}
            handlePlay={handlePlay}
            timeDisplayFormat={timeDisplayFormat}
          />
        </div>
        <canvas ref={canvasRef} />
      </div>
    </>
  );
};
