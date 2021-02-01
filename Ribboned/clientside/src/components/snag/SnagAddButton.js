import React, { useContext, useEffect, useState } from "react";
import { Button } from "reactstrap";
import { SnagTextBox } from "./SnagTextBox";
import "./Snag.css";

export const SnagAddButton = ({
  playerRef,
  timeDisplayFormat,
  handlePause,
  handlePlay,
  playing,
  ribbonId,
}) => {
  const [showTextBox, setShowTextBox] = useState(false);
  const [currentSeconds, setCurrentSeconds] = useState(0);

  const textBoxToggle = () => {
    showTextBox ? setShowTextBox(false) : setShowTextBox(true);
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

  //add info for snag
  const addSnag = () => {
    console.log({
      time: playerRef.current.getCurrentTime(),
      display: format(playerRef.current.getCurrentTime()),
    });
  };

  //get current seconds int
  useEffect(() => {
    setCurrentSeconds(playerRef.current.getCurrentTime());
  }, [timeDisplayFormat]);
  //pause and play video toggle
  useEffect(() => {
    playing ? handlePause() : handlePlay();
  }, [showTextBox]);

  return (
    <>
      <div className={showTextBox ? "hideSnagBtn" : "showSnagBtn"}>
        <Button
          className="btn btn-lg btn-secondary w-50"
          onClick={() => {
            textBoxToggle();
            handlePlay();
          }}
        >
          Add Snag {timeDisplayFormat}
        </Button>
      </div>
      <div className={showTextBox ? "showSnagNote" : "hideSnagNote"}>
        <SnagTextBox
          handlePlay={handlePlay}
          textBoxToggle={textBoxToggle}
          timeDisplayFormat={timeDisplayFormat}
          ribbonId={ribbonId}
          seconds={currentSeconds}
        />
      </div>
    </>
  );
};
