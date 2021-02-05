import React, { useContext, useEffect } from "react";
import { YouTubeSearch } from "./youtube/YouTubeSearch";
import Logo from "../img/RibbonedWordOnly.png";
import { SnagContext } from "../providers/SnagProvider";
import { Link } from "react-router-dom";
import { YouTubeList } from "./youtube/YouTubeList";
import { RibbonRecommendedList } from "./ribbon/RibbonRecommendedList";
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
          <div>{/* <YouTubeList /> */}</div>
          <div>
            {" "}
            <h3>What's everyone else watching</h3>
            <RibbonRecommendedList />
          </div>

          <ListGroup className="my-5">
            <ListGroupItem active>
              <ListGroupItemHeading>Recent Ribbon Snags</ListGroupItemHeading>
              <ListGroupItemText>
                See your lastest ribbon snags made here...
              </ListGroupItemText>
            </ListGroupItem>
            {snags.map((snag) => {
              return (
                <ListGroupItem key={snag.id} href="#" action>
                  <ListGroupItemHeading>
                    <Link to={`/ribbon/${snag.ribbon?.id}`}>
                      {snag.ribbon?.title}
                    </Link>
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
