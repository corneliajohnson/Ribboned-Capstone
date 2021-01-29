import React, { useContext, useEffect } from "react";
import { RibbonContext } from "../../providers/RibbonProvider";

import { RibbonCard } from "./RibbonCard";

export const RibbonList = () => {
  const { getUserRibbons, ribbons } = useContext(RibbonContext);

  useEffect(() => {
    getUserRibbons();
  }, []);

  if (!ribbons) {
    return null;
  }

  return (
    <div className="container">
      {console.log(ribbons)}
      <h1>Ribbons</h1>
      {ribbons.length === 0 ? (
        <p className="text-center">None</p>
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
