import React, { useState, useEffect } from "react";
import { Col, Row, Button, Form, FormGroup, Label, Input } from "reactstrap";
import "./Ribbon.css";

export const RibbonForm = (props) => {
  const [isPublic, setIsPublic] = useState(false);
  const [ribbon, setRibbon] = useState({});
  const handlePrivacy = () => {
    if (!isPublic) {
      setIsPublic(true);
    } else {
      setIsPublic(false);
    }
    console.log(isPublic);
  };

  const handleControlledInputChange = (event) => {
    const newRibbon = { ...ribbon };
    newRibbon[event.target.name] = event.target.value;
    setRibbon(newRibbon);
  };
  return (
    <div className="container">
      <div className="w-75 mx-auto p-4">
        <Form className="border p-5">
          <h2 className="text-center">New Ribbon</h2>
          <FormGroup row>
            <Label for="title" lg={2}>
              Title
            </Label>
            <Col lg={10}>
              <Input
                type="text"
                name="title"
                onChange={handleControlledInputChange}
                required="required"
              />
            </Col>
          </FormGroup>
          <Row form>
            <Col md={6}>
              <FormGroup row>
                <Label for="category" lg={2}>
                  Category
                </Label>
                <Col lg={10}>
                  <Input
                    type="select"
                    name="categoryId"
                    onChange={handleControlledInputChange}
                    required="required"
                  ></Input>
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
                    type="select"
                    name="sourceId"
                    onChange={handleControlledInputChange}
                    required="required"
                  ></Input>
                </Col>
              </FormGroup>
            </Col>
          </Row>
          <FormGroup row>
            <Label for="url" lg={2}>
              URL
            </Label>
            <Col gl={10}>
              <Input
                type="url"
                name="url"
                onChange={handleControlledInputChange}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="decription" lg={2}>
              Decription
            </Label>
            <Col lg={10}>
              <Input
                type="textarea"
                name="decription"
                onChange={handleControlledInputChange}
                required="required"
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <div className="button b2 m-1" id="button-18">
              <input
                className="checkbox"
                checked={isPublic}
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
