import React, { useContext, useEffect, useState } from "react";
import { RibbonContext } from "../../providers/RibbonProvider";
import { useParams } from "react-router-dom";
import { SnagDelete } from "./SnagDelete";
import { SnagContext } from "../../providers/SnagProvider";

export const SnagList = ({ playerRef, handlePlay, playing }) => {
  const { getByRibbonById, snags } = useContext(SnagContext);
  const { ribbonId } = useParams();

  useEffect(() => {
    getByRibbonById(ribbonId);
  }, [playing]);

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
                  Edit <SnagDelete snag={snag} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
