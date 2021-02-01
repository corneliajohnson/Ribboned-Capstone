import React, { useContext, useEffect } from "react";
import { RibbonContext } from "../../providers/RibbonProvider";
import { RibbonCard } from "./RibbonCard";
import { useParams } from "react-router-dom";

export const RibbonListByCategory = () => {
  const { getRibbonByCategory, ribbons } = useContext(RibbonContext);
  const { categoryId } = useParams();

  useEffect(() => {
    getRibbonByCategory(categoryId);
  }, [categoryId]);

  if (!ribbons) {
    return null;
  }

  return (
    <div className="container">
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
