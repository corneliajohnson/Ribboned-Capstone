import React, { useState, useContext } from "react";
import { CategoryContext } from "../../providers/CategoryProvider";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const CategoryDelete = ({ category }) => {
  const { deleteCategory, getCategories } = useContext(CategoryContext);
  const [pendingDelete, setPendingDelete] = useState(false);

  const handleDelete = () => {
    deleteCategory(category.id)
      .then(() =>
        toast.error(`${category.name.toUpperCase()} Deleted`, {
          position: "bottom-right",
          hideProgressBar: true,
        })
      )
      .then(getCategories);
    setPendingDelete(false);
  };

  if (!category) return null;

  return (
    <>
      <Button
        className="btn btn-sm btn-danger"
        onClick={(e) => setPendingDelete(true)}
      >
        Delete
      </Button>
      <Modal isOpen={pendingDelete}>
        <ModalHeader>Delete {category.name}?</ModalHeader>
        <ModalBody>Are you sure you want to delete this category?</ModalBody>
        <ModalBody className="text-warning">
          Ribbons with this category will be uncategorized.
        </ModalBody>
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
