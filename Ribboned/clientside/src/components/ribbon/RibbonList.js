import React, { useContext, useEffect, useState } from "react";
import { RibbonContext } from "../../providers/RibbonProvider";
import Logo from "../../img/RibbonedWordOnly.png";
import { Link } from "react-router-dom";

import { RibbonCard } from "./RibbonCard";
import { RibbonSearch } from "./RibbonSearch";

export const RibbonList = () => {
  const { getUserRibbons } = useContext(RibbonContext);
  const [ribbons, setRibbons] = useState([]);

  useEffect(() => {
    getUserRibbons()
      .then((res) => res.json())
      .then((ribbons) => {
        setRibbons(ribbons);
      });
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
      <h1 className="text-center">All Ribbons</h1>
      <RibbonSearch onSearch={(results) => setRibbons(results)} />
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
