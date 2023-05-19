import React, { useState } from "react";
//import { Form, Button } from "react-bootstrap";

const CategoryAdd = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // Add form submit handler here
  const handleSubmit = (e) => {
    e.preventDefault();

    //Vallidate the input fields
    if (name.trim() === "") {
      alert("Please enter a name for the product category.");
      return;
    }

    if (description.trim() === "") {
      alert("Please enter a description for the product category.");
      return;
    }

    // Add the product category to the database
    // ...

    // Redirect to the product category list page
    window.location.href = "/product-categories";
    //// const newCategory = { name, description };
    // Send a POST request to your backend API to create a new product category
  };

  return (
    <div class="mx-5">
      <form onSubmit={handleSubmit} class="w-75">
        <h2>Categories</h2>
        <div class="w-90 p-3 mb-2 bg-info text-dark">Add New Category</div>
        <div class="w-90 p-3">
          <label for="categoryname" class="form-label">
            <b>Category Name</b>
          </label>
          <input
            type="text"
            class="form-control"
            id="categoryname"
            placeholder="Enter Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div class="w-90 p-3">
          <label for="description" class="form-label">
            <b>Category Description</b>
          </label>
          <textarea
            class="form-control"
            id="categoryDescription"
            placeholder="Enter description of category"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
          ></textarea>
        </div>
        <div class="form-group">
          <label class="col-md-4 control-label" for="submit"></label>
          <div class=" gap-2 d-flex justify-content-md-end">
            <button id="submit" name="submit" class="btn btn-primary" value="1">
              Add Category
            </button>
            <a
              href="/link-to/whatever-address/"
              id="cancel"
              name="cancel"
              class="btn btn-default"
            >
              Cancel
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};
//  <Button type="submit">Add Category</Button>
export default CategoryAdd;
