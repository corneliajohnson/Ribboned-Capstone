import React, { useContext, useEffect, useState } from "react";
import { YouTubeSearch } from "./youtube/YouTubeSearch";
import Logo from "../img/RibbonedWordOnly.png";
import { SnagContext } from "../providers/SnagProvider";
import Moment from "react-moment";
import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
} from "reactstrap";

export const Home = () => {
  const { getRecentSnags, snags } = useContext(SnagContext);

  useEffect(() => {
    getRecentSnags();
  }, []);

  if (!snags) return null;

  return (
    <>
      <div className="container">
        <div className="align-items-center">
          <img alt="ribboned" src={Logo} />
          <YouTubeSearch />
          <div style={{ height: "30vh", border: "1px solid black" }}>
            <h3>Show Videos Here</h3>
          </div>

          <ListGroup className="my-5">
            <ListGroupItem active>
              <ListGroupItemHeading>Recent Ribbon Snags</ListGroupItemHeading>
              <ListGroupItemText>
                See your lastest ribbon snags made here
              </ListGroupItemText>
            </ListGroupItem>
            {snags.map((snag) => {
              return (
                <ListGroupItem>
                  <ListGroupItemHeading>
                    {snag.ribbon?.title}
                  </ListGroupItemHeading>
                  <ListGroupItemText className="text-muted">
                    <Moment fromNow>{snag.dateCreated}</Moment>{" "}
                  </ListGroupItemText>
                  <ListGroupItemText>{snag.note}</ListGroupItemText>
                </ListGroupItem>
              );
            })}
          </ListGroup>
        </div>
      </div>
    </>
  );
};
