import React, { useState, useRef, useContext, useEffect } from "react";
import { SnagContext } from "../../providers/SnagProvider";
import { useParams } from "react-router-dom";

export const RibbonList = () => {
  const { getByRibbonById } = useContext(SnagContext);
  const { ribbonId } = useParams();

  useEffect(() => {
    getByRibbonById(ribbonId);
  }, []);

  return (
    <div className="row p-5">
      <div className="col align-self-center">
        <div class="list-group">
          <div class="list-group-item list-group-item-action active">
            Ribbon Snags
          </div>
        </div>
      </div>
    </div>
  );
};
