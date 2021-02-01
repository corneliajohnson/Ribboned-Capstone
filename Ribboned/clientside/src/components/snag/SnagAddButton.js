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
}) => {
  const [showTextBox, setShowTextBox] = useState(false);

  const textBox = () => {
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

  useEffect(() => {
    if (showTextBox) {
      handlePause();
    }
    console.log(playing);
  }, [showTextBox]);

  return (
    <>
      <div className={showTextBox ? "hideSnagBtn" : "showSnagBtn"}>
        <Button
          className="btn btn-lg btn-secondary w-50"
          onClick={() => {
            textBox();
          }}
        >
          Add Snag {timeDisplayFormat}
        </Button>
      </div>
      <div className={showTextBox ? "showSnagNote" : "hideSnagNote"}>
        <SnagTextBox />
      </div>
    </>
  );
};
