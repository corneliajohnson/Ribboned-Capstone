import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SnagDelete } from "./SnagDelete";
import { RibbonContext } from "../../providers/RibbonProvider";
import { SnagEdit } from "./SnagEdit";

export const SnagList = ({ playerRef, handlePlay }) => {
  const { getRibbonById } = useContext(RibbonContext);
  const [snags, setSnags] = useState([]);
  const { ribbonId } = useParams();

  useEffect(() => {
    getRibbonById(ribbonId).then((response) => {
      setSnags(response.snags);
    });
  }, []);

  if (!snags) return null;

  return (
    <div>
      <h3 className="text-center">Ribbon Snags</h3>
      <table className="table table-hover">
        <thead>
          <tr className="bg-primary text-white">
            <td width="10%">Time</td>
            <td width="70%">Note</td>
            <td width="20%"></td>
          </tr>
        </thead>
        <tbody>
          {snags.map((snag) => {
            return (
              <tr key={snag.id}>
                <td className="float-left">
                  <a
                    className="btn btn-link p-2"
                    onClick={() => {
                      //go to seconds stamp of video
                      playerRef.current.seekTo(snag.seconds);
                      //play video
                      handlePlay();
                    }}
                  >
                    {snag.timeString}
                  </a>
                </td>
                <td className="text-wrap">{snag.note}</td>
                <td>
                  <SnagEdit snag={snag} />
                  <SnagDelete snag={snag} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
