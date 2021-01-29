import React, { useContext, useEffect } from "react";
import { Button } from "reactstrap";
export const SnagAddButton = ({
  playerRef,
  timeDisplayFormat,
  handlePlayPause,
}) => {
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

  return (
    <Button
      className="btn btn-lg btn-secondary w-50"
      onClick={() => {
        handlePlayPause();
        addSnag();
      }}
    >
      Add Snag {timeDisplayFormat}
    </Button>
  );
};
