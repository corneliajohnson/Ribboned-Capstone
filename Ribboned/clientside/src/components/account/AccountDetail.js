import React, { useContext, useEffect, useState } from "react";
import { Card, Row, Col, CardHeader, CardText } from "reactstrap";
import { RibbonContext } from "../../providers/RibbonProvider";
import { SnagContext } from "../../providers/SnagProvider";

export const AccountDetail = () => {
  const { getUserRibbons, ribbons } = useContext(RibbonContext);
  const { getUserSnags, snags } = useContext(SnagContext);
  const user = JSON.parse(localStorage.getItem("userProfile"));
  const [favortieCategory, setFavoriteCategory] = useState();

  useEffect(() => {
    getUserRibbons(user.id).then(getUserSnags);
  }, []);

  if (!user) return null;
  if (!ribbons) return null;
  if (!snags) return null;

  return (
    <div className="container">
      <h1>Account</h1>
      <Card className="w-50">
        <CardHeader>Account Information</CardHeader>
        <Row>
          <Col s="12" md="4">
            Image
          </Col>
          <Col s="12" md="6">
            <CardText>Username: {user.userName}</CardText>
            <CardText>Email: {user.email}</CardText>
            <CardText> Favorite Category: N/A</CardText>
            <CardText>Current Ribbons: {ribbons.length}</CardText>
            <CardText>Ribbon Snags: {snags.length}</CardText>
          </Col>
        </Row>
      </Card>
    </div>
  );
};
