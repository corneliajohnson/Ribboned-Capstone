import React, { useContext, useEffect } from "react";
import { RibbonContext } from "../../providers/RibbonProvider";

import { RibbonCard } from "./RibbonCard";

export const RibbonTrashList = () => {
  const { getUserTrashRibbons, ribbons } = useContext(RibbonContext);

  useEffect(() => {
    getUserTrashRibbons();
  }, []);

  if (!ribbons) {
    return null;
  }

  return (
    <div className="container">
      <h1>Ribbons</h1>
      {ribbons.length === 0 ? (
        <p className="text-center">Trash Empty</p>
      ) : (
        <div className="row">
          {ribbons.map((ribbon) => (
            <RibbonCard key={ribbon.id} ribbon={ribbon} />
          ))}
        </div>
      )}
    </div>
  );
};
