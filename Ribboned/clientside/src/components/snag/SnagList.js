import React, { useContext, useEffect } from "react";
import { SnagContext } from "../../providers/SnagProvider";
import { useParams } from "react-router-dom";
import { Button } from "reactstrap";
import ReactPlayer from "react-player";

export const SnagList = ({ playerRef, handlePlay }) => {
  const { getByRibbonById, snags } = useContext(SnagContext);
  const { ribbonId } = useParams();

  useEffect(() => {
    getByRibbonById(ribbonId);
  }, []);

  return (
    <div className="row p-5">
      <div className="col align-self-center">
        <div class="list-group">
          <div class="list-group-item list-group-item-action active">
            Ribbon Snags
          </div>
          {snags.map((snag) => (
            <>
              <div class="list-group-item list-group-item-actions">
                <Button
                  className="btn btn-link"
                  onClick={() => {
                    //go to seconds stamp of video
                    playerRef.current.seekTo(snag.time);
                    //play video
                    handlePlay();
                  }}
                >
                  {snag.display}
                </Button>
                Snag Note
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};
