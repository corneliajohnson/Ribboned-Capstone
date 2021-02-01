import React, { useContext, useEffect, useState } from "react";
import { CategoryContext } from "../../providers/CategoryProvider";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

export const CategoryNavList = () => {
  const { categories, getCategories } = useContext(CategoryContext);
  const defaultCategory = JSON.parse(localStorage.getItem("userProfile"))
    .uncategorizedId;

  //get all user categories
  useEffect(() => {
    getCategories();
  }, []);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  if (!categories) {
    return null;
  }

  return (
    <>
      <Dropdown
        li
        color="link"
        className="navbar__item nav__addcategorylink"
        isOpen={dropdownOpen}
        toggle={toggle}
      >
        <DropdownToggle caret>Categories</DropdownToggle>
        <DropdownMenu>
          <Link className="navbar__link" to="/categories">
            Manager Categories
          </Link>
          <DropdownItem divider />
          {categories.map((c) => (
            <DropdownItem key={c.id}>
              {" "}
              <Link to={`/ribbon/category/${c.id}`}>{c.name}</Link>
            </DropdownItem>
          ))}
          <DropdownItem>
            <Link to={`/ribbon/category/${defaultCategory}`}>
              uncategorizedId
            </Link>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  );
};