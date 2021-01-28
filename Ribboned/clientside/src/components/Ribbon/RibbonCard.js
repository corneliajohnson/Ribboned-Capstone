import React from "react";
import Moment from "react-moment";
import ReactPlayer from "react-player";

import { Card, CardText, CardBody, CardTitle, CardSubtitle } from "reactstrap";

export const RibbonCard = ({ ribbon }) => (
  <div className="col-4">
    <Card style={{ height: "500px" }}>
      <ReactPlayer
        top
        width="100%"
        height="60%"
        src="/assets/318x180.svg"
        alt="Card image cap"
        controls={false}
        url={ribbon.url}
      />
      <CardBody>
        <CardTitle tag="h5">{ribbon.title}</CardTitle>
        <CardSubtitle tag="h6" className="mb-2 text-muted">
          <Moment fromNow>{ribbon.dateCreated}</Moment>
        </CardSubtitle>
        <CardText>{ribbon.decription}</CardText>
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
  </div>
);
