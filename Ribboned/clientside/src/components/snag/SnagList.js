import React, { useContext, useEffect, useState } from "react";
import { RibbonContext } from "../../providers/RibbonProvider";
import { useParams } from "react-router-dom";
import { Button, Table, ListGroup, ListGroupItem } from "reactstrap";

export const SnagList = ({ playerRef, handlePlay, playing }) => {
  const { getRibbonById } = useContext(RibbonContext);
  const [snags, setSnags] = useState([]);
  const { ribbonId } = useParams();

  useEffect(() => {
    getRibbonById(ribbonId).then((response) => {
      setSnags(response.snags);
    });
  }, [playing]);

  if (!snags) return null;

  return (
    <div>
      <h3 className="text-center">Ribbon Snags</h3>
      <table class="table table-hover">
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
              <tr>
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
                <td>Edit Delete</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
// <ListGroupItem href="#" action>
//   <span>
//     <Button
//       className="btn btn-link"
//       onClick={() => {
//         //go to seconds stamp of video
//         playerRef.current.seekTo(snag.seconds);
//         //play video
//         handlePlay();
//       }}
//     >
//       {snag.timeString}
//     </Button>
//   </span>
//   <span>{snag.note}</span>
//   <span>Edit Delete</span>
// </ListGroupItem>
