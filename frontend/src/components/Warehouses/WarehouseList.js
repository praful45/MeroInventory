import React, { useState, useEffect } from "react";
import { BsEye, BsFillTrashFill, BsPencilSquare } from "react-icons/bs";
import { Table, Button } from "react-bootstrap";
import axios from "axios";
import WarehouseView from "./WarehouseView";
import WarehouseEdit from "./WarehouseEdit";
import "../../App.css";

const Warehouses = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [editedWarehouse, setEditedWarehouse] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [deletingItemId, setDeletingItemId] = useState(null);

  const fetchWarehouse = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/");
      setWarehouses(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const updateWarehouseList = async () => {
    await fetchWarehouse();
  };
  useEffect(() => {
    fetchWarehouse();
  }, []);

  const viewWarehouse = (warehouse) => {
    setSelectedWarehouse(warehouse);
  };

  const closeDetails = () => {
    setSelectedWarehouse(null);
  };
  const closeEditDetails = () => {
    setEditedWarehouse(null);
  };

  const editWarehouse = (warehouse) => {
    setEditedWarehouse(warehouse);
  };

  const deleteRow = (id) => {
    console.log(id);
    setDeletingItemId(id);
    setShowPopup(true);
  };

  const confirmDelete = () => {
    axios.delete(`http://localhost:5000/api//${deletingItemId}`);
    setShowPopup(false);
    updateWarehouseList();
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ"
        crossOrigin="anonymous"
      />

      <div className="container">
        <h2>Warehouse</h2>
        <hr className="hr" />

        <h2>Manage Warehouse</h2>
        <hr className="hr" style={{ background: "#AFD3E2" }} />

        <div
          className="table-container"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <table
            className="table table-striped text-center"
            style={{ width: "1300px", margin: "auto" }}
          >
            <thead>
              <tr>
                <th scope="col">SN</th>
                <th scope="col">Warehouse's Name</th>
                <th scope="col">Address</th>
                <th scope="col">Capacity</th>
                <th scope="col">Manager</th>
                <th scope="col">Inventory</th>
                <th scope="col">Action</th>
              </tr>
            </thead>

            <tbody>
              {warehouses.map((row, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{row.name}</td>
                  <td>{row.address}</td>
                  <td>{row.capacity}</td>
                  <td>{row.manager}</td>
                  <td>{row.inventory}</td>
                  <td>
                    <span>
                      <button
                        className="icon-btn"
                        onClick={() => viewWarehouse(row)}
                      >
                        <BsEye size={18} color="blue" />{" "}
                      </button>
                      <button
                        className="icon-btn"
                        onClick={() => editWarehouse(row)}
                      >
                        <BsPencilSquare size={18} color="black" />{" "}
                      </button>
                      <button
                        className="icon-btn"
                        onClick={() => deleteRow(row._id)}
                      >
                        <BsFillTrashFill size={18} color="red" />
                      </button>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedWarehouse && (
        <WarehouseView
          name={selectedWarehouse.name}
          address={selectedWarehouse.address}
          capacity={selectedWarehouse.capacity}
          manager={selectedWarehouse.manager}
          inventory={selectedWarehouse.inventory}
          onClose={closeDetails}
        />
      )}
      {editedWarehouse && (
        <WarehouseEdit
          id={editedWarehouse._id}
          name={editedWarehouse.name}
          address={editedWarehouse.address}
          capacity={editedWarehouse.capacity}
          manager={editedWarehouse.manager}
          inventory={editedWarehouse.inventory}
          onClose={() => {
            closeEditDetails();
            updateWarehouseList();
          }}
        />
      )}

      {showPopup && (
        <div className="modal" style={{ display: "block" }}>
          <div
            className="modal-dialog"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Are you sure you want to delete this warehouse?
                </h5>
              </div>
              <div className="modal-footer">
                <button className="btn btn-danger" onClick={confirmDelete}>
                  OK
                </button>
                <button className="btn btn-primary" onClick={closePopup}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Warehouses;
