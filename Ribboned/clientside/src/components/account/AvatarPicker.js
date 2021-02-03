import React, { useState, useContext, useEffect } from "react";
import { AvatarContext } from "../../providers/AvatarProvider";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export const AvatarPicker = (props) => {
  const { getAvatars, avatars } = useContext(AvatarContext);

  useEffect(() => {
    getAvatars();
  }, []);

  //for modal toggle
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  if (!avatars) return null;

  return (
    <div>
      <Button color="primary" onClick={toggle}>
        Change Avatar
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          <div className="row">
            {avatars.map((avatar) => {
              return (
                <div key={avatar.id} className="col" sm="12" md="6" lg="4">
                  <img
                    src={avatar.imageURL}
                    alt="avatar"
                    style={{ width: "100px" }}
                  />
                </div>
              );
            })}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Do Something
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
