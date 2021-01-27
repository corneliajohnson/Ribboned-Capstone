import React, { useState, createContext } from "react";
import firebase from "firebase/app";
import "firebase/auth";

export const CategoryContext = createContext();

export const CategoryProvider = (props) => {
  const getToken = () => firebase.auth().currentUser.getIdToken();
  const [categories, setCategories] = useState([]);
  const userId = JSON.parse(localStorage.getItem("userProfile")).id;
  const apiUrl = "/api/category";

  const getCategories = () => {
    getToken().then((token) =>
      fetch(`${apiUrl}/getbyuserid/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((categories) => {
          setCategories(categories);
        })
    );
  };

  return (
    <CategoryContext.Provider value={{ categories, getCategories }}>
      {props.children}
    </CategoryContext.Provider>
  );
};
