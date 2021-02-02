import React, { useState, useContext, useEffect } from "react";
import { RibbonContext } from "../../providers/RibbonProvider";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { useHistory } from "react-router-dom";

export const RibbonTrashMove = ({ ribbon }) => {
  const { updateRibbon } = useContext(RibbonContext);
  const [pendingTrash, setPendingTrash] = useState(false);
  const history = useHistory();

  const handleTrash = () => {
    updateRibbon({
      id: ribbon.id,
      title: ribbon.title,
      decription: ribbon.decription,
      sourceId: ribbon.sourceId,
      url: ribbon.url,
      thumbnail: ribbon.thumbnail,
      categoryId: ribbon.categoryId,
      isActive: false,
      isPublic: ribbon.isPublic,
      dateCreated: ribbon.dateCreated,
    }).then(() => history.push("/ribbons"));
    setPendingTrash(false);
  };

  if (!ribbon) return null;

  return (
    <>
      <Button
        className="btn btn-sm btn-danger"
        onClick={(e) => setPendingTrash(true)}
      >
        Delete
      </Button>
      <Modal isOpen={pendingTrash}>
        <ModalHeader>Delete {ribbon.title}?</ModalHeader>
        <ModalBody>Are you sure you want to delete this ribbon?</ModalBody>
        <ModalFooter>
          <Button onClick={(e) => setPendingTrash(false)}>No, Cancel</Button>
          <Button className="btn btn-outline-danger" onClick={handleTrash}>
            Yes, Delete
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
