import React, { useState, useContext, useEffect } from "react";
import { RibbonContext } from "../../providers/RibbonProvider";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const RibbonRestore = ({ ribbon }) => {
  const { updateRibbon } = useContext(RibbonContext);
  const [pendingRestore, setPendingRestore] = useState(false);
  const history = useHistory();

  const handleRestore = () => {
    updateRibbon({
      id: ribbon.id,
      title: ribbon.title,
      decription: ribbon.decription,
      sourceId: ribbon.sourceId,
      url: ribbon.url,
      thumbnail: ribbon.thumbnail,
      categoryId: ribbon.categoryId,
      isActive: true,
      isPublic: ribbon.isPublic,
      dateCreated: ribbon.dateCreated,
    })
      .then(() => history.push("/ribbons/trash"))
      .then(() =>
        toast("Ribbon restored", {
          position: "bottom-right",
          hideProgressBar: true,
        })
      );
    setPendingRestore(false);
  };

  if (!ribbon) return null;

  return (
    <>
      <Button
        className="btn btn-sm btn-info"
        onClick={(e) => setPendingRestore(true)}
      >
        Restore
      </Button>
      <Modal isOpen={pendingRestore}>
        <ModalHeader>Restore {ribbon.title}?</ModalHeader>
        <ModalBody>Are you sure you want to restore this ribbon?</ModalBody>
        <ModalFooter>
          <Button onClick={(e) => setPendingRestore(false)}>No, Cancel</Button>
          <Button className="btn btn-outline-info" onClick={handleRestore}>
            Yes, Restore
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
