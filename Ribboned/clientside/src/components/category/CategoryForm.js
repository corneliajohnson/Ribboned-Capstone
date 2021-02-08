import React, { useContext, useState } from "react";
import { CategoryContext } from "../../providers/CategoryProvider";
import { Form, FormGroup, Input, Button, FormText, Card } from "reactstrap";

export const CategoryForm = () => {
  const {
    addCategory,
    category,
    setCategory,
    updateCategory,
    getCategories,
  } = useContext(CategoryContext);
  const userId = JSON.parse(localStorage.getItem("userProfile")).id;
  const [loading, setLoading] = useState(false);

  const handleInputControl = (event) => {
    const newCategory = { ...category };
    newCategory[event.target.name] = event.target.value;
    setCategory(newCategory);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (category.id) {
      category.userProfileId = userId;
      updateCategory(category).then(getCategories);
    } else {
      category.userProfileId = userId;
      addCategory(category).then(getCategories);
    }
    setCategory({ id: 0, name: "", userProfileId: userId });
  };

  if (!category) return null;

  return (
    <div className="col">
      <Card className="card mb-3 shadow bg-white rounded">
        <h2 className="my-2 text-center">Add A New Category</h2>
        <Form onSubmit={handleSubmit}>
          <FormGroup className="m-3">
            <Input
              type="text"
              name="name"
              value={category.name}
              onChange={handleInputControl}
              maxLength="50"
              required="required"
            />
            <FormText>Duplicates will not be displayed.</FormText>
          </FormGroup>
          <Button className="btn-block" color="dark" disabled={loading}>
            submit
          </Button>
        </Form>
      </Card>
    </div>
  );
};
