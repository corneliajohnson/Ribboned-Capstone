import React, { useContext, useEffect } from "react";
import { YouTubeSearch } from "./youtube/YouTubeSearch";
import Logo from "../img/RibbonedWordOnly.png";
import { SnagContext } from "../providers/SnagProvider";
import { Link } from "react-router-dom";
import { RibbonRecommendedList } from "./ribbon/RibbonRecommendedList";
import { YouTubeList } from "./youtube/YouTubeList";
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
          <div className="text-center my-5">
            <Link className="m-5" to="/account">
              <img alt="ribboned logo" src={Logo} />
            </Link>
          </div>
          <div className="mt-3">
            <YouTubeSearch />
          </div>
          <div>
            <YouTubeList />
          </div>
          <div className="my-5">
            {" "}
            <h3>What's everyone watching</h3>
            <small>see public ribbons by other users</small>
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
