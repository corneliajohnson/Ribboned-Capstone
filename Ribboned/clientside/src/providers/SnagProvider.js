import React, { useState, createContext, useContext } from "react";
import firebase from "firebase/app";
import "firebase/auth";

export const SnagContext = createContext();

export const SnagProvider = (props) => {
  const getToken = () => firebase.auth().currentUser.getIdToken();
  const [snags, setSnags] = useState([]);

  const apiUrl = "/api/snag";

  const updateSnag = (snag) => {
    return getToken().then((token) => {
      return fetch(`${apiUrl}/${snag.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(snag),
      });
    });
  };

  const addSnag = (snag) => {
    return getToken().then((token) => {
      return fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(snag),
      });
    });
  };

  const deleteSnag = (id) => {
    return getToken().then((token) => {
      return fetch(`/api/snag/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    });
  };

  const getByRibbonById = (id) => {
    return getToken().then((token) => {
      return fetch(`${apiUrl}/getbyribbon/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((snags) => {
          setSnags(snags);
        });
    });
  };

  const getRecentSnags = () => {
    return getToken().then((token) => {
      return fetch(`${apiUrl}/getmostrecentsnags`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((snags) => {
          setSnags(snags);
        });
    });
  };

  const getUserSnags = () => {
    return getToken().then((token) => {
      return fetch(`${apiUrl}/usersnags`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((snags) => {
          setSnags(snags);
        });
    });
  };

  return (
    <SnagContext.Provider
      value={{
        snags,
        updateSnag,
        addSnag,
        deleteSnag,
        getByRibbonById,
        getRecentSnags,
        getUserSnags,
      }}
    >
      {props.children}
    </SnagContext.Provider>
  );
};
