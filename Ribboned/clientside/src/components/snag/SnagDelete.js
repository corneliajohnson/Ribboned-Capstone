import React, { useState, useContext, useEffect } from "react";
import { SnagContext } from "../../providers/SnagProvider";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export const SnagDelete = ({ snag }) => {
  const { deleteSnag, getByRibbonById } = useContext(SnagContext);
  const [pendingDelete, setPendingDelete] = useState(false);

  //get ribbon with snags
  useEffect(() => {
    getByRibbonById(snag.ribbonId);
  }, [pendingDelete]);

  const handleDelete = () => {
    deleteSnag(snag.id);
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
        <ModalHeader className="d-inline-block text-truncate">
          Delete {snag.note}?
        </ModalHeader>
        <ModalBody>Are you sure you want to delete this snag?</ModalBody>
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
