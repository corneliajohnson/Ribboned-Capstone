import React, { useContext, useEffect, useState } from "react";
import { RibbonContext } from "../../providers/RibbonProvider";
import { CategoryContext } from "../../providers/CategoryProvider";
import { RibbonCard } from "./RibbonCard";
import { useParams } from "react-router-dom";

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
    <div className="container">
      <h1 className="text-center">{category.name} Ribbons</h1>
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
