import React, { useState, useContext, useEffect } from "react";
import { AvatarContext } from "../../providers/AvatarProvider";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export const AvatarPicker = (props) => {
  const { getAvatars, avatars } = useContext(AvatarContext);
  const { getUserById, updateUser } = useContext(UserProfileContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const [userProfile, setUserProfile] = useState({});
  //for modal toggle
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  useEffect(() => {
    getUserById()
      .then((res) => setUserProfile(res))
      .then(getAvatars);
  }, [selectedImage, userProfile]);

  const handleAvatar = (e) => {
    //debugger;
    e.preventDefault();
    updateUser({ ...userProfile, avatarId: selectedImage })
      .then(() => toggle())
      .then(() => setSelectedImage(null));
  };

  if (!avatars) return null;
  if (!userProfile) return null;

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
                  <a
                    href="#"
                    onClick={() => {
                      setSelectedImage(avatar.id);
                    }}
                  >
                    <img
                      className={
                        selectedImage === avatar.id
                          ? "border border-primary"
                          : ""
                      }
                      src={avatar.imageURL}
                      alt="avatar"
                      style={{ width: "100px" }}
                    />
                  </a>
                </div>
              );
            })}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
          <Button color="primary" onClick={handleAvatar}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
