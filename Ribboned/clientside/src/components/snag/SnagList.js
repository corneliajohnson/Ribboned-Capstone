import React, { useContext, useEffect, useState } from "react";
import { SnagContext } from "../../providers/SnagProvider";
import { useParams } from "react-router-dom";
import { Button } from "reactstrap";
import ReactPlayer from "react-player";

export const SnagList = ({ playerRef, handlePlay }) => {
  const { getByRibbonById } = useContext(SnagContext);
  const [snags, setSnags] = useState([]);
  const { ribbonId } = useParams();

  useEffect(() => {
    getByRibbonById(ribbonId);
  }, []);

  console.log(typeof snags);
  if (!Array.isArray(snags)) return null;

  return (
    <div className="row p-5">
      <div className="col align-self-center">
        <div class="list-group">
          <div class="list-group-item list-group-item-action active">
            Ribbon Snags
            {snags?.map((snags) => {
              <div
                key={snags.id}
                class="list-group-item list-group-item-actions"
              >
                Snag
              </div>;
            })}
          </div>
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
