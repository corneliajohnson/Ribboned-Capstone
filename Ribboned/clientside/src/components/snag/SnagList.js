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
            <div key={snag.id} class="list-group-item list-group-item-actions">
              {snag?.note}
            </div>;
          })}
        </div>
      </div>
    </div>
  );
};

// <div class="list-group-item list-group-item-actions">
//   <Button
//     className="btn btn-link"
//     onClick={() => {
//       //go to seconds stamp of video
//       playerRef.current.seekTo(snag.time);
//       //play video
//       handlePlay();
//     }}
//   >
//     {snag.display}
//   </Button>
//   Snag Note
// </div>;
