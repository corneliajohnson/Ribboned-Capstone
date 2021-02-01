import React, { useContext, useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { SnagContext } from "../../providers/SnagProvider";

export const SnagTextBox = ({
  textBoxToggle,
  handlePlay,
  timeDisplayFormat,
  ribbonId,
  seconds,
}) => {
  const { addSnag, updateSnag, getByRibbonById, snags } = useContext(
    SnagContext
  );
  const [snag, setSnag] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getByRibbonById(ribbonId);
  }, []);

  const handleInputControl = (event) => {
    const newSnag = { ...snag };
    newSnag[event.target.name] = event.target.value;
    setSnag(newSnag);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (snag.note.trim() === "") {
      console.log("blank");
    } else {
      if (snag.id) {
        console.log("foredit");
      } else {
        addSnag({
          ribbonId: ribbonId,
          note: snag.note,
          timeString: timeDisplayFormat,
          seconds: parseInt(seconds),
        });
        handlePlay();
        textBoxToggle();
      }
    }
  };

  if (!snag) return null;

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
      <FormText className="float-right">{snag.note?.length}/500</FormText>
      <div className="d-flex justify-content-around">
        <Button onClick={textBoxToggle}>Cancel</Button>
        <Button disabled={loading}>Save</Button>
      </div>
    </Form>
  );
};
