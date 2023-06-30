import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AddSupplier = () => {
  const [supplierName, setSupplierName] = useState("");
  const [supplierAddress, setSupplierAddress] = useState("");
  const [supplierNumber, setSupplierNumber] = useState([]);
  const [supplierEmail, setSupplierEmail] = useState("");
  const navigate = useNavigate();


  function handleChange(event) {
    const value = event.target.value;

    // Update the state of the `categories` variable.
    this.setState({
      categories: value,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (supplierName === "") {
      alert("Please enter a supplier name.");
      return;
    }

    if (supplierAddress === "") {
      alert("Please enter a supplier address.");
      return;
    }


    if (supplierNumber === "") {
      alert("Please enter your number.");
      return;
    }

    if (supplierEmail=== "") {
      alert("Please enter your email.");
      return;
    }

    // Make a request to the backend API to create the new supplier.
    const formData = new FormData();
    formData.append("name", supplierName);
    formData.append("address", supplierAddress);
    formData.append("number", supplierNumber);
    formData.append("email", supplierEmail);

    axios
      .post("http://localhost:5000/api/create-supplier", formData)
      .then((supplier) => {
        // Redirect the user back to the inventory page.
        navigate("/supplier");
      });
  };

  useEffect(() => {
    // Get the list of categories from the backend API.
    axios
      .get("http://localhost:5000/api/getAllSupplier")
      .then((suppliers) => {
        setSupplierName(suppliers.data);
      });
  }, []);

  return (
    <div className="mx-5">
      <form onSubmit={handleSubmit} className="w-75">
        <h2>Warehouse</h2><hr></hr>
        <div className="w-90 p-3 mb-2" style={{ background: "#AFD3E2" ,borderRadius: '20px',}}>
          Add Supplier
        </div><hr></hr>
       
        <div className="w-90 p-3">
          <label htmlFor="suppliername" className="form-label">
            <b>Supplier's Name</b>
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Supplier Name"
            value={supplierName}
            onChange={(e) => setSupplierName(e.target.value)}
          />
        </div>
        <div className="w-90 p-3">
          <label htmlFor="address" className="form-label">
            <b>Address</b>
          </label>
          <textarea
            className="form-control"
            placeholder="Enter Address"
            value={supplierAddress}
            onChange={(e) => setSupplierAddress(e.target.value)}
          />
        </div>
    
        <div className="w-90 p-3">
          <label htmlFor="number" className="form-label">
            <b>Phone Number</b>
          </label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter Phone Number"
            value={supplierNumber}
            onChange={(e) => setSupplierNumber(e.target.value)}
          />
        </div>
        <div className="w-90 p-3">
          <label htmlFor="email" className="form-label">
            <b>Email</b>
          </label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={supplierEmail}
            onChange={(e) => setSupplierEmail(e.target.value)}
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
              Add Supplier
            </button>
            <Link
              to="/supplier"
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

export default AddSupplier;
