import React, { useContext, useEffect } from "react";
import { RibbonContext } from "../../providers/RibbonProvider";
import { RibbonCard } from "./RibbonCard";
import Logo from "../../img/RibbonedWordOnly.png";
import { Link } from "react-router-dom";

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
      <div className="text-center my-5">
        <Link className="m-5" to="/account">
          <img alt="ribboned logo" src={Logo} />
        </Link>
      </div>
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
