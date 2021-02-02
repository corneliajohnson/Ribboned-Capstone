import React, { useState, createContext } from "react";
import { useHistory } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";

export const RibbonContext = createContext();

export const RibbonProvider = (props) => {
  const getToken = () => firebase.auth().currentUser.getIdToken();
  const [ribbons, setRibbons] = useState([]);
  const history = useHistory();

  const apiUrl = "/api/ribbon";

  const getUserRibbons = () => {
    const userId = JSON.parse(localStorage.getItem("userProfile")).id;
    getToken().then((token) => {
      return fetch(`${apiUrl}/getbyuser/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((ribbons) => {
          setRibbons(ribbons);
        });
    });
  };

  const getUserTrashRibbons = () => {
    const userId = JSON.parse(localStorage.getItem("userProfile")).id;
    getToken().then((token) => {
      return fetch(`${apiUrl}/getusertrash/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((ribbons) => {
          setRibbons(ribbons);
        });
    });
  };

  const getRibbonByCategory = (id) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/getbycategory/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((ribbons) => {
          setRibbons(ribbons);
        })
    );
  };

  const updateRibbon = (ribbon) => {
    getToken().then((token) => {
      return fetch(`${apiUrl}/${ribbon.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(ribbon),
      });
      //.then(() => history.push(`/ribbon/${ribbon.id}`));
    });
  };

  const addRibbon = (ribbon) => {
    getToken().then((token) => {
      return fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(ribbon),
      }).then(() => history.push("/ribbons"));
    });
  };

  const deleteRibbon = (id) => {
    getToken().then((token) => {
      return fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    });
  };

  const getRibbonById = (id) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((resp) => resp.json())
    );
  };

  const searchRibbons = (searchQuery) => {
    getToken().then((token) => {
      return fetch(`${apiUrl}/search/${searchQuery}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json());
    });
  };

  return (
    <RibbonContext.Provider
      value={{
        ribbons,
        getUserRibbons,
        updateRibbon,
        addRibbon,
        deleteRibbon,
        searchRibbons,
        getRibbonById,
        getUserTrashRibbons,
        getRibbonByCategory,
      }}
    >
      {props.children}
    </RibbonContext.Provider>
  );
};
