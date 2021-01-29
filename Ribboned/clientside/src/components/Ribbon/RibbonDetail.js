import React, { useState, useRef, useContext, useEffect } from "react";
import ReactPlayer from "react-player";
import { useParams, useHistory } from "react-router-dom";
import { RibbonContext } from "../../providers/RibbonProvider";
import { SnagList } from "../snag/SnagList";
import { SnagAddButton } from "../snag/SnagAddButton";
import Moment from "react-moment";

export const RibbonDetail = () => {
  const { getRibbonById } = useContext(RibbonContext);
  const [ribbon, setRibbon] = useState({});
  const [showDescription, setShowDecription] = useState(true);
  const { ribbonId } = useParams();

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
        <h1 className="text-center">{ribbon.title}</h1>
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
          <div className="mx-auto w-50 font-weight-bold">
            {" "}
            <p>
              {ribbon.decription}{" "}
              <a href="#" onClick={toggleDecription}>
                Hide Decription
              </a>
            </p>{" "}
          </div>
          <div className="text-muted mx-auto w-50">
            Ribbion Created:{" "}
            <Moment format=" MMM D, YYYY" withTitle>
              {ribbon.createdDateTime}
            </Moment>
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
