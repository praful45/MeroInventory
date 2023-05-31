import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AddProduct = () => {
  const [productImage, setProductImage] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategories, setProductCategories] = useState([]);
  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState("");

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Make a request to the backend API to create the new product.
    const formData = new FormData();
    formData.append("image", productImage);
    formData.append("name", productName);
    formData.append("description", productDescription);
    formData.append("categories", productCategories);
    formData.append("price", productPrice);
    formData.append("quantity", productQuantity);

    axios
      .post("http://localhost:5000/api/createProduct", formData)
      .then((response) => response.json())
      .then((product) => {
        // Redirect the user back to the inventory page.
        //window.location.href = "/inventory";
      });
  };

  useEffect(() => {
    // Get the list of categories from the backend API.
    axios
      .get("http://localhost:5000/api/getAllCategory")
      .then((response) => response.json())
      .then((categories) => {
        setProductCategories(categories);
      });
  }, []);

  return (
    <div className="mx-5">
      <form onSubmit={handleSubmit} className="w-75">
        <h2>Products</h2>
        <div className="w-90 p-3 mb-2" style={{ background: "#AFD3E2" }}>
          Add New Products
        </div>
        <div className="w-90 p-3">
          <label for="img" className="form-label">
            <b>Image</b>
          </label>
          <input
            type="file"
            className="form-control"
            id="productImage"
            name="image"
            onChange={handleImageChange}
          />
        </div>
        <div className="w-90 p-3">
          <label for="productname" className="form-label">
            <b>Product Name</b>
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div className="w-90 p-3">
          <label for="description" className="form-label">
            <b>Description</b>
          </label>
          <textarea
            className="form-control"
            placeholder="Enter Description"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          />
        </div>
        <div className="w-90 p-3">
          <label for="categoryname" className="form-label">
            <b>Categories</b>
          </label>
          <select multiple name="categories">
            {productCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="w-90 p-3">
          <label for="price" className="form-label">
            <b>Price</b>
          </label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter Price"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
        </div>
        <div className="w-90 p-3">
          <label for="quantity" className="form-label">
            <b>Quantity</b>
          </label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter quantity"
            value={productQuantity}
            onChange={(e) => setProductQuantity(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="col-md-4 control-label" for="submit"></label>
          <div className=" gap-2 d-flex justify-content-md-end text-dark">
            <button
              id="submit"
              name="submit"
              className="btn btn-primary text-dark"
              style={{ background: "#19A7CE" }}
              value="1"
            >
              Add Product
            </button>
            <Link
              to="/product"
              id="cancel"
              name="cancel"
              className="btn btn-default"
              style={{ background: "#19A7CE" }}
            >
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
