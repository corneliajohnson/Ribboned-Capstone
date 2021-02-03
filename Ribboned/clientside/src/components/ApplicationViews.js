import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Home } from "./Home";
import { RibbonDetail } from "./ribbon/RibbonDetail";
import { Login } from "./login/Login";
import { Register } from "./register/Register";
import { UserProfileContext } from "../providers/UserProfileProvider";
import { CategoryManager } from "./category/CategoryManager";
import { RibbonList } from "./ribbon/RibbonList";
import { RibbonForm } from "./ribbon/RibbonForm";
import { RibbonTrashMove } from "./ribbon/RibbonTrashMove";
import { RibbonTrashList } from "./ribbon/RibbonTrashList";
import { RibbonListByCategory } from "./ribbon/RibbonListByCategory";
import { AccountDetail } from "./account/AccountDetail";

export const ApplicationViews = () => {
  const { isLoggedIn } = useContext(UserProfileContext);
  return (
    <Switch>
      <Route exact path="/login">
        <Login />
      </Route>

      <Route exact path="/register">
        <Register />
      </Route>

      <Route exact path="/">
        {isLoggedIn ? <Home /> : <Redirect to="/login" />}
      </Route>

      <Route exact path="/ribbon/create">
        {isLoggedIn ? <RibbonForm /> : <Redirect to="/login" />}
      </Route>

      <Route path="/ribbon/edit/:ribbonId(\d+)">
        {isLoggedIn ? <RibbonForm /> : <Redirect to="/login" />}
      </Route>

      <Route path="/ribbon/delete/:ribbonId(\d+)">
        {isLoggedIn ? <RibbonTrashMove /> : <Redirect to="/login" />}
      </Route>

      <Route exact path="/categories">
        {isLoggedIn ? <CategoryManager /> : <Redirect to="/login" />}
      </Route>

      <Route path="/ribbon/category/:categoryId(\d+)">
        {isLoggedIn ? <RibbonListByCategory /> : <Redirect to="/login" />}
      </Route>

      <Route exact path="/ribbons">
        {isLoggedIn ? <RibbonList /> : <Redirect to="/login" />}
      </Route>

      <Route exact path="/ribbon/:ribbonId(\d+)">
        {isLoggedIn ? <RibbonDetail /> : <Redirect to="/login" />}
      </Route>

      <Route exact path="/ribbons/trash">
        {isLoggedIn ? <RibbonTrashList /> : <Redirect to="/login" />}
      </Route>

      <Route exact path="/account">
        {isLoggedIn ? <AccountDetail /> : <Redirect to="/login" />}
      </Route>
    </Switch>
  );
};
