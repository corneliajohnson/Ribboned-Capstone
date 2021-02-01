import React, { useContext, useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { SnagContext } from "../../providers/SnagProvider";

export const SnagTextBox = ({
  textBoxToggle,
  handlePlay,
  timeDisplayFormat,
  ribbonId,
}) => {
  const { addSnag, updateSnag, getSnags } = useContext(SnagContext);
  const [snag, setSnag] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputControl = (event) => {
    const newSnag = { ...snag };
    newSnag[event.target.name] = event.target.value;
    setSnag(newSnag);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (snag.id) {
    } else {
      console.log(snag.note);
      handlePlay();
      textBoxToggle();
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="border mx-auto p-3 w-75">
      <FormGroup>
        <Label for="note">Add A Snag at {timeDisplayFormat}</Label>
        <Input
          type="textarea"
          onChange={handleInputControl}
          name="note"
          required="required"
        />
      </FormGroup>
      <Button onClick={textBoxToggle}>Cancel</Button>
      <Button disabled={loading}>Save</Button>
    </Form>
  );
};
