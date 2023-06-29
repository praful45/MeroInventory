import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsFolderFill } from "react-icons/bs";
import { BrowserRouter, Link } from "react-router-dom";
import axios from "axios";

export default function ProductEdit(props) {
  const [name, setName] = useState(props.name || "");
  const [address, setAddress] = useState(props.address || "");
  const [capacity, setCapacity] = useState(props.capacity || "");
  const [manager, setManager] = useState(props.manager || "");
  const [inventory, setInventory] = useState(props.inventory || "");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      name,
      address,
      capacity,
      manager,
      inventory,
    };

    axios
      .put(`http://localhost:5000/api//${props.id}`, data)
      .then((response) => {
        if (response.status === 200) {
          setName("");
          setAddress("");
          setCapacity("");
          setManager("");
          setInventory("");
          props.onClose();
        } else {
          alert("Error updating warehouse");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ"
        crossorigin="anonymous"
      />
      <div className="view-overlay">
        <div
          className="w-90 p-3"
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            justifyContent: "center",
            alignItems: "center",
            width: "700px",
            height: "720px",
            border: "2px solid black",
            borderRadius: "10px",
            boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
            backgroundColor: "white",
          }}
        >
          <form onSubmit={handleSubmit}>
            <div className="form">
              <div
                className="w-90 p-3 mb-2 text-dark"
                style={{ fontSize: "20px" }}
              >
                <b>Edit Warehouse</b>
              </div>
              <hr className="hr" />
              <div className="w-90 p-1">
                <label htmlFor="warehousename" className="form-label">
                  <b>Warehouse' Name</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="warehousename"
                  placeholder="Enter Warehouse Name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>

              <div className="w-90 p-1">
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
              <div className="w-90 p-1">
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
              <div className="w-90 p-1">
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
              <div className="w-90 p-1">
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
                <label
                  className="col-md-4 control-label"
                  htmlFor="submit"
                ></label>
                <div className="gap-2 d-flex justify-content-md-end">
                  <button onClick={props.onClose} className="btn btn-primary">
                    Cancel
                  </button>
                  <button
                    type="submit"
                    id="submit"
                    name="submit"
                    className="btn btn-primary"
                    value="1"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
