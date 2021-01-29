import React from "react";
import Moment from "react-moment";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";

import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardImg,
} from "reactstrap";

export const RibbonCard = ({ ribbon }) => (
  <div className="col-sm-12 col-md-6 col-lg-4">
    <Link to={`/ribbon/${ribbon.id}`}>
      <Card style={{ height: "500px" }}>
        {ribbon.thumbnail ? (
          <CardImg
            top
            width="100%"
            height="60%"
            src="/assets/318x180.svg"
            alt="Card image cap"
            controls={false}
            src={ribbon.thumbnail}
          />
        ) : (
          <ReactPlayer
            top
            width="100%"
            height="60%"
            src="/assets/318x180.svg"
            alt="Card image cap"
            controls={false}
            url={ribbon.url}
          />
        )}
        <CardBody>
          <CardTitle className="ribbon-card-title" tag="h5">
            {ribbon.title}
          </CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">
            <Moment fromNow>{ribbon.dateCreated}</Moment>
          </CardSubtitle>
          <CardText className="ribbon-card-decription">
            {ribbon.decription}
          </CardText>
          {ribbon.snags.length === 0 ? (
            "No Ribbon Snags"
          ) : (
            <>
              <CardText>Ribbon Snags</CardText>
              {ribbon.snags[0] ? (
                <CardText>
                  {ribbon.snags[0].note}{" "}
                  <Moment fromNow>{ribbon.snags[0].dateCreated}</Moment>{" "}
                </CardText>
              ) : (
                ""
              )}
              {ribbon.snags[1] ? (
                <CardText>
                  {ribbon.snags[1].note}{" "}
                  <Moment fromNow>{ribbon.snags[1].dateCreated}</Moment>{" "}
                </CardText>
              ) : (
                ""
              )}
            </>
          )}
        </CardBody>
      </Card>
    </Link>
  </div>
);
