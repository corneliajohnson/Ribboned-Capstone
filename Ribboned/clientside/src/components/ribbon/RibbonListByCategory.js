import React, { useContext, useEffect, useState } from "react";
import { RibbonContext } from "../../providers/RibbonProvider";
import { CategoryContext } from "../../providers/CategoryProvider";
import { RibbonCard } from "./RibbonCard";
import { useParams } from "react-router-dom";
import Logo from "../../img/RibbonedWordOnly.png";
import Empty from "../../img/Empty.png";
import { Link } from "react-router-dom";

export const RibbonListByCategory = () => {
  const { getRibbonByCategory, ribbons } = useContext(RibbonContext);
  const { getCategoryById } = useContext(CategoryContext);
  const [category, setCategory] = useState({});
  const { categoryId } = useParams();

  useEffect(() => {
    getRibbonByCategory(categoryId)
      .then(() => getCategoryById(categoryId))
      .then((res) => setCategory(res));
  }, [categoryId]);

  if (!ribbons) return null;
  if (!category) return null;

  return (
    <div className="container" style={{ marginBottom: "10%" }}>
      <div className="text-center my-5">
        <Link className="m-5" to="/account">
          <img alt="ribboned logo" src={Logo} />
        </Link>
      </div>
      <h1 className="text-center">{category.name} Ribbons</h1>
      {ribbons.length === 0 && !ribbons[0] ? (
        <div className="text-center">
          <img src={Empty} alt="empty" />
        </div>
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
