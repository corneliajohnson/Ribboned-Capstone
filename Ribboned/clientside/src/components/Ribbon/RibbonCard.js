import React from "react";

import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";

export const RibbonCard = ({ ribbon }) => (
  <div className="col-3">
    <Card>
      <CardImg
        top
        width="100%"
        src="/assets/318x180.svg"
        alt="Card image cap"
      />
      <CardBody>
        <CardTitle tag="h5">{ribbon.title}</CardTitle>
        <CardSubtitle tag="h6" className="mb-2 text-muted">
          {ribbon.dateCreated}
        </CardSubtitle>
        <CardText>{ribbon.decription}</CardText>
        <Button>Button</Button>
      </CardBody>
    </Card>
  </div>
);
