import React, { useContext, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./NavBar.css";
import Logo from "../../img/RibbonedWordOnly.png";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { List } from "reactstrap";
import { CategoryNavList } from "../category/CategoryNavList";

export const NavBar = (props) => {
  const { getCurrentUser, logout, getUserById } = useContext(
    UserProfileContext
  );
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    getUserById().then((res) => setUserProfile(res));
  }, []);

  const user = getCurrentUser();
  const history = useHistory();
  const [isActive, setActive] = useState(false);

  const toggleClass = (e) => {
    if (e.target.id === "openClose") {
      setActive(!isActive);
    }
    if (!isActive) {
      document.querySelector(".container").style.width = "75%";
      document.querySelector(".container").style.float = "right";
    } else {
      document.querySelector(".container").style.float = "none";
      document.querySelector(".container").style.width = "100%";
    }
  };

  const logoutAndReturn = () => {
    return logout().then(() => {
      history.push("/login");
    });
  };

  return (
    <>
      {user ? (
        <nav id="mySideNav" className={isActive ? "openNav" : ""}>
          <a href="#">
            <div id="openClose" onClick={toggleClass}></div>
          </a>
          <List className="navbar">
            <li className="navbar__item active fixed-top m-3">
              <Link className="navbar__link" to="/account">
                <img
                  src={userProfile.avatar?.imageURL}
                  alt="avatar"
                  style={{
                    width: "50px",
                    borderRadius: "50%",
                    border: "black, 3px, solid",
                  }}
                />
              </Link>
            </li>
            <li className="navbar__item fixed-top mt-5">
              <Link className="navbar__link" to="/">
                <img className="logo" alt="ribboned logo" src={Logo} />
              </Link>
            </li>
            <li className="navbar__item nav__addribbonlink">
              <Link className="navbar__link" to="/ribbon/create">
                Add Ribbon
              </Link>
            </li>
            <CategoryNavList />
            <li className="navbar__item nav__ribbonlink">
              <Link className="navbar__link" to="/ribbons">
                My Ribbons
              </Link>
            </li>
            <li
              className="navbar__item fixed-bottom ml-2"
              style={{ marginBottom: "30%" }}
            >
              <Link className="navbar__link" to="/ribbons/trash">
                Trash
              </Link>
            </li>
            <li className="navbar__item fixed-bottom ml-2 mb-5">
              <Link className="navbar__link" onClick={logoutAndReturn}>
                Log Out
              </Link>
            </li>
          </List>
        </nav>
      ) : (
        ""
      )}
    </>
  );
};
