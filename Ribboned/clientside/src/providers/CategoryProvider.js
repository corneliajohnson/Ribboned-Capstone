import React, { useState, createContext } from "react";
import firebase from "firebase/app";
import "firebase/auth";

export const CategoryContext = createContext();

export const CategoryProvider = (props) => {
  const getToken = () => firebase.auth().currentUser.getIdToken();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({});
  const apiUrl = "/api/category";

  const getCategories = () => {
    const userId = JSON.parse(localStorage.getItem("userProfile")).id;
    return getToken().then((token) => {
      return fetch(`${apiUrl}/getbyuserid/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((categories) => {
          setCategories(categories);
        });
    });
  };

  const updateCategory = (category) => {
    return getToken().then((token) => {
      return fetch(`${apiUrl}/${category.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(category),
      });
    });
  };

  const addCategory = (category) => {
    return getToken().then((token) => {
      return fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(category),
      });
    });
  };

  const deleteCategory = (id) => {
    return getToken().then((token) => {
      return fetch(`/api/category/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    });
  };

  const getCategoryById = (id) => {
    return getToken().then((token) => {
      return fetch(`${apiUrl}/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((resp) => resp.json());
    });
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        getCategories,
        updateCategory,
        addCategory,
        deleteCategory,
        setCategory,
        category,
        getCategoryById,
      }}
    >
      {props.children}
    </CategoryContext.Provider>
  );
};
