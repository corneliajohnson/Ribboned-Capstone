import React from "react";
import { Col, Row, Button, Form, FormGroup, Label, Input } from "reactstrap";
import "./Ribbon.css";

export const RibbonForm = (props) => {
  return (
    <div className="container">
      <div className="w-75 mx-auto p-4">
        <Form className="border p-5">
          <h2 className="text-center">New Ribbon</h2>
          <FormGroup row>
            <Label for="exampleEmail" sm={2}>
              Title
            </Label>
            <Col sm={10}>
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
                <Label for="exampleEmail" sm={2}>
                  Category
                </Label>
                <Col sm={10}>
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
                <Label for="exampleEmail" sm={2}>
                  Source
                </Label>
                <Col sm={10}>
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
            <Label for="exampleEmail" sm={2}>
              URL
            </Label>
            <Col sm={10}>
              <Input
                type="email"
                name="email"
                id="exampleEmail"
                placeholder="with a placeholder"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="exampleEmail" sm={2}>
              Decription
            </Label>
            <Col sm={10}>
              <Input
                type="email"
                name="email"
                id="exampleEmail"
                placeholder="with a placeholder"
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <div class="button b2" id="button-18">
              <input type="checkbox" class="checkbox" />
              <div class="knobs"></div>
              <div class="layer"></div>
            </div>
          </FormGroup>
        </Form>
      </div>
    </div>
  );
};
