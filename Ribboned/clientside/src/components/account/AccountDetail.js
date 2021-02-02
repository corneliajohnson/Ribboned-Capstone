import React, { useContext, useEffect, useState } from "react";
import { Card, Row, Col, CardImg, CardText } from "reactstrap";
import { RibbonContext } from "../../providers/RibbonProvider";
import { SnagContext } from "../../providers/SnagProvider";

export const AccountDetail = () => {
  const { getUserRibbons, ribbons } = useContext(RibbonContext);
  const { getUserSnags, snags } = useContext(SnagContext);
  const user = JSON.parse(localStorage.getItem("userProfile"));

  useEffect(() => {
    getUserRibbons(user.id).then(getUserSnags);
  }, []);

  if (!user) return null;
  if (!ribbons) return null;
  if (!snags) return null;

  https: return (
    <div className="container">
      <h1 className="text">Account</h1>
      <Card className="w-50 border-0">
        <Row>
          <Col s="12" md="4">
            <CardImg src="https://firebasestorage.googleapis.com/v0/b/ribboned-50daf.appspot.com/o/avatars%2Favatar0.png?alt=media&token=82e10059-6c7d-41c6-99a6-87dbece9a74d" />
          </Col>
          <Col s="12" md="6">
            <CardText>Username: {user.userName}</CardText>
            <CardText>Email: {user.email}</CardText>
            <CardText>Current Ribbons: {ribbons.length}</CardText>
            <CardText>Ribbon Snags: {snags.length}</CardText>
          </Col>
        </Row>
      </Card>
    </div>
  );
};
