import React, { useState, createContext } from "react";
import firebase from "firebase/app";
import "firebase/auth";

export const AvatarContext = createContext();

export const AvatarProvider = (props) => {
  const getToken = () => firebase.auth().currentUser.getIdToken();
  const [avatars, setAvatars] = useState([]);

  const apiUrl = "/api/avatar";

  const getAvatars = () => {
    getToken().then((token) =>
      fetch(`${apiUrl}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((avatars) => {
          setAvatars(avatars);
        })
    );
  };

  return (
    <AvatarContext.Provider value={{ avatars, getAvatars }}>
      {props.children}
    </AvatarContext.Provider>
  );
};
