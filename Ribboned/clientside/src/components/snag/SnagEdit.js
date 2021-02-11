import React, { useState, useContext } from "react";
import { SnagContext } from "../../providers/SnagProvider";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  FormGroup,
  Label,
  Input,
  FormText,
} from "reactstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const SnagEdit = ({ snag }) => {
  const { getByRibbonById, updateSnag } = useContext(SnagContext);
  const [pendingEdit, setPendingEdit] = useState(false);
  const [inputWarning, setInputWarning] = useState(false);
  const [snagToEdit, setSnagToEdit] = useState({});

  const handleInputControl = (event) => {
    const newSnag = { ...snag };
    newSnag[event.target.name] = event.target.value;
    setSnagToEdit(newSnag);
  };

  const handleEdit = () => {
    if (snagToEdit.note.trim() === "") {
      setInputWarning(true);
    } else {
      updateSnag({ ...snag, note: snagToEdit.note })
        .then(() =>
          toast("Snag Updated", {
            position: "bottom-right",
            hideProgressBar: true,
          })
        )
        .then(getByRibbonById(snag.ribbonId));
      setPendingEdit(false);
    }
  };

  return (
    <>
      <Button
        className="btn btn-sm btn-primary"
        onClick={(e) => setPendingEdit(true)}
      >
        Edit
      </Button>
      <Modal isOpen={pendingEdit}>
        <ModalHeader className="d-inline-block text-truncate">
          Edit snag
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="note">Add A Snag at {snag.timeString}</Label>
            <Input
              type="textarea"
              onChange={handleInputControl}
              name="note"
              defaultValue={snag.note}
              required="required"
              maxLength="255"
            />
          </FormGroup>
          {inputWarning ? (
            <FormText color="danger">Please add a note.</FormText>
          ) : (
            ""
          )}
          <FormText className="float-right">{snag.note?.length}/500</FormText>
        </ModalBody>
        <ModalFooter>
          <Button onClick={(e) => setPendingEdit(false)}>No, Cancel</Button>
          <Button className="btn btn-outline-primary" onClick={handleEdit}>
            Yes, Update
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
