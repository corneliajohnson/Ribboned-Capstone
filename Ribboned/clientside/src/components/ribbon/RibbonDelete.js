import React, { useState, useContext, useEffect } from "react";
import { RibbonContext } from "../../providers/RibbonProvider";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { useHistory } from "react-router-dom";

export const RibbonDelete = ({ ribbon }) => {
  const { deleteRibbon } = useContext(RibbonContext);
  const [pendingDelete, setPendingDelete] = useState(false);
  const history = useHistory();

  const handleDelete = () => {
    deleteRibbon(ribbon.id).then(() => history.push("/ribbons/trash"));
    setPendingDelete(false);
  };

  return (
    <>
      <Button
        className="btn btn-sm btn-danger"
        onClick={(e) => setPendingDelete(true)}
      >
        Delete
      </Button>
      <Modal isOpen={pendingDelete}>
        <ModalHeader>Permanently Delete {ribbon.title}?</ModalHeader>
        <ModalBody>Are you sure you want to delete this ribbon?</ModalBody>
        <ModalFooter>
          <Button onClick={(e) => setPendingDelete(false)}>No, Cancel</Button>
          <Button className="btn btn-outline-danger" onClick={handleDelete}>
            Yes, Delete
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
