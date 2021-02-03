import React, { useContext, useEffect, useState } from "react";
import { Card, Row, Col, CardImg, CardText } from "reactstrap";
import { RibbonContext } from "../../providers/RibbonProvider";
import { SnagContext } from "../../providers/SnagProvider";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { AvatarPicker } from "./AvatarPicker";

export const AccountDetail = () => {
  const { getUserRibbons, ribbons } = useContext(RibbonContext);
  const { getUserById } = useContext(UserProfileContext);
  const { getUserSnags, snags } = useContext(SnagContext);
  const [userProfile, setUserProfile] = useState({});
  const user = JSON.parse(localStorage.getItem("userProfile"));

  useEffect(() => {
    getUserRibbons(user.id).then(getUserSnags);
  }, []);

  useEffect(() => {
    getUserById().then((res) => setUserProfile(res));
  }, []);

  if (!userProfile) return null;
  if (!ribbons) return null;
  if (!snags) return null;

  return (
    <div className="container">
      <h1 className="text">Account</h1>
      <Card className="w-50 border-0">
        <Row>
          <Col s="12" md="4">
            <CardImg src={userProfile.avatar?.imageURL} />
            <AvatarPicker />
          </Col>
          <Col s="12" md="6">
            <CardText>Username: {userProfile.userName}</CardText>
            <CardText>Email: {userProfile.email}</CardText>
            <CardText>Current Ribbons: {ribbons.length}</CardText>
            <CardText>Ribbon Snags: {snags.length}</CardText>
          </Col>
        </Row>
      </Card>
    </div>
  );
};
