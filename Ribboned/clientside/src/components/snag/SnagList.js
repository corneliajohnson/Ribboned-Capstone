import React, { useContext, useEffect, useState } from "react";
import { RibbonContext } from "../../providers/RibbonProvider";
import { useParams } from "react-router-dom";
import { Button } from "reactstrap";
import ReactPlayer from "react-player";

export const SnagList = ({ playerRef, handlePlay, snags }) => {
  return (
    <div className="row p-5">
      <div className="col align-self-center">
        <div class="list-group">
          <div class="list-group-item list-group-item-action active">
            Ribbon Snags
          </div>
          {snags.map((snag) => {
            return (
              <div
                key={snag.id}
                class="list-group-item list-group-item-actions"
              >
                <Button
                  className="btn btn-link"
                  onClick={() => {
                    //go to seconds stamp of video
                    playerRef.current.seekTo(snag.seconds);
                    //play video
                    handlePlay();
                  }}
                >
                  {snag.timeString}
                </Button>
                <span>{snag.note}</span>
                <span className="float-right">Edit Delete</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
