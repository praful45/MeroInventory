import React, { useState } from "react";
import Axios from "axios";
//import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const WarehouseAdd = () => {
  const [name, setName] = useState("");
  //const [product, setProduct] = useState("");
  //const [category, setCategory] = useState("");
  const [address, setAddress] = useState("");
  const [capacity, setCapacity] = useState("");
  const [manager, setManager] = useState("");
  const [inventory, setInventory] = useState("");

  // Add form submit handler here
  const handleSubmit = (e) => {
    e.preventDefault();

    //Vallidate the input fields
    if (name.trim() === "") {
      alert("Please enter a name of the warehouse.");
      return;
    }

    if (address.trim() === "") {
      alert("Please enter a appropriate address");
      return;
    }

    if (capacity.trim() === "") {
      alert("Please enter a appropriate capacity");
      return;
    }

    if (manager.trim() === "") {
      alert("Please enter a manager");
      return;
    }

    if (inventory.trim() === "") {
      alert("Please enter a appropriate inventory");
      return;
    }

    // Redirect to the product category list page
    ///window.location.href = "/product-categories";
    // Send a POST request to your backend API to create a new product category
    const data = {
      name,
      address,
      capacity,
      manager,
      inventory,
    };

    Axios.post("http://localhost:5000/api/", data)
      .then((response) => {
        if (response.status === 200) {
          setName("");
          setAddress("");
          setCapacity("");
          setManager("");
          setInventory("");
        } else {
          alert("Error adding new warehouse");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="mx-5">
      <form onSubmit={handleSubmit} className="w-75">
        <h2>Warehouse</h2>
        <div className="w-90 p-3 mb-2" style={{ background: "#AFD3E2" }}>
          Add Warehouse
        </div>
        <div className="w-90 p-3">
          <label for="warehousename" className="form-label">
            <b>Warehouse's Name</b>
          </label>
          <input
            type="text"
            className="form-control"
            id="warehousename"
            placeholder="Enter Warehouse Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="w-90 p-3">
          <label htmlFor="address" className="form-label">
            <b>Address</b>
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="w-90 p-3">
          <label htmlFor="capacity" className="form-label">
            <b>Capacity</b>
          </label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter Capacity"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
          />
        </div>

        <div className="w-90 p-3">
          <label htmlFor="manager" className="form-label">
            <b>Manager</b>
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Manager Name"
            value={manager}
            onChange={(e) => setManager(e.target.value)}
          />
        </div>

        <div className="w-90 p-3">
          <label htmlFor="inventory" className="form-label">
            <b>Inventory</b>
          </label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter data"
            value={inventory}
            onChange={(e) => setInventory(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="col-md-4 control-label" htmlFor="submit"></label>
          <div className=" gap-2 d-flex justify-content-md-end text-dark">
            <button
              id="submit"
              name="submit"
              className="btn btn-primary text-dark"
              style={{ background: "#19A7CE" }}
              value="1"
            >
              Add Warehouse
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

export default WarehouseAdd;
