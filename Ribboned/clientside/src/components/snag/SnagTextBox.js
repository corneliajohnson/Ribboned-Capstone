import React from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

export const SnagTextBox = (props) => {
  return (
    <Form>
      <FormGroup>
        <Label for="note">Text Area</Label>
        <Input type="text" name="note" id="exampleText" />
      </FormGroup>
      <Button>Cancel</Button>
      <Button>Submit</Button>
    </Form>
  );
};
