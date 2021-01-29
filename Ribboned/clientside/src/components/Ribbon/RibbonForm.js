import React, { useState, useEffect } from "react";
import { Col, Row, Button, Form, FormGroup, Label, Input } from "reactstrap";
import "./Ribbon.css";

export const RibbonForm = (props) => {
  const [isPublic, setIsPublic] = useState(false);
  const handlePrivacy = () => {
    if (!isPublic) {
      setIsPublic(true);
    } else {
      setIsPublic(false);
    }
    console.log(isPublic);
  };
  return (
    <div className="container">
      <div className="w-75 mx-auto p-4">
        <Form className="border p-5">
          <h2 className="text-center">New Ribbon</h2>
          <FormGroup row>
            <Label for="exampleEmail" lg={2}>
              Title
            </Label>
            <Col lg={10}>
              <Input
                type="email"
                name="email"
                id="exampleEmail"
                placeholder="with a placeholder"
              />
            </Col>
          </FormGroup>
          <Row form>
            <Col md={6}>
              <FormGroup row>
                <Label for="exampleEmail" lg={2}>
                  Category
                </Label>
                <Col lg={10}>
                  <Input
                    type="email"
                    name="email"
                    id="exampleEmail"
                    placeholder="with a placeholder"
                  />
                </Col>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup row>
                <Label for="exampleEmail" lg={2}>
                  Source
                </Label>
                <Col lg={10}>
                  <Input
                    type="email"
                    name="email"
                    id="exampleEmail"
                    placeholder="with a placeholder"
                  />
                </Col>
              </FormGroup>
            </Col>
          </Row>
          <FormGroup row>
            <Label for="exampleEmail" lg={2}>
              URL
            </Label>
            <Col gl={10}>
              <Input
                type="email"
                name="email"
                id="exampleEmail"
                placeholder="with a placeholder"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="exampleEmail" lg={2}>
              Decription
            </Label>
            <Col lg={10}>
              <Input
                type="email"
                name="email"
                id="exampleEmail"
                placeholder="with a placeholder"
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <div className="button b2 m-1" id="button-18">
              <input
                type="checkbox"
                className="checkbox"
                onChange={handlePrivacy}
              />
              <div className="knobs"></div>
              <div className="layer"></div>
            </div>
          </FormGroup>
        </Form>
      </div>
    </div>
  );
};
