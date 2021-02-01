import React, { useState, useContext, useEffect } from "react";
import { RibbonContext } from "../../providers/RibbonProvider";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export const RibbonDelete = ({ ribbon }) => {
  const { deleteRibbon, getUserTrashRibbons } = useContext(RibbonContext);
  const [pendingDelete, setPendingDelete] = useState(false);

  const handleDelete = () => {
    deleteRibbon(ribbon.id); //.then(() => history("/"))
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
