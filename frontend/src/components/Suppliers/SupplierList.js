import React, { useEffect, useState } from "react";
import { BsEye, BsFillTrashFill, BsPencilSquare } from "react-icons/bs";
import { Link } from 'react-router-dom'
import axios from 'axios';
import SupplierView from "./SupplierView";
import SupplierEdit from "./SupplierEdit";
import '../../../src/App.css';

export default function SupplierList(props) {
    const [suppliers, setSuppliers] = useState([]);
    const [selectedSupplier, setSelectedSupplier] = useState(null);
    const [editedSupplier, setEditedSupplier] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [deletingItemId, setDeletingItemId] = useState(null);


    const fetchSuppliers = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/getAllSupplier');
        setSuppliers(response.data);
    } catch (error) {
        console.log(error);
        // Handle the error here
    }
};
    const updateSupplierList = async () => {
        await fetchSuppliers();
    };
    useEffect(() => {
        fetchSuppliers();
    }, []);



    const viewSupplier = (supplier) => {
        setSelectedSupplier(supplier);
    };

    const closeDetails = () => {
        setSelectedSupplier(null);
    };
    const closeEditDetails = () => {
        setEditedSupplier(null);
    };

    const deleteRow = (id) => {
        console.log(id);
        setDeletingItemId(id);
        setShowPopup(true);
    };

    const confirmDelete = () => {
        axios.delete(`http://localhost:5000/api/deleteSupplier/${deletingItemId}`)
        setShowPopup(false);
        updateSupplierList();
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    const editSupplier = (supplier) => {
        setEditedSupplier(supplier);
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
                <h2>Suppliers</h2>
                <hr className="hr" />

                <h2>Manage Suppliers</h2>
                <hr className="hr" />

                <div className="table-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <table className="table table-striped text-center" style={{ width: '1300px', margin: 'auto' }}>
                        <thead>
                            <tr>
                                <th scope="col">SN</th>
                                <th scope="col">Supplier Name</th>
                                <th scope="col">Total Product</th>
                                <th scope="col">Total Category</th>
                                <th scope="col">Address</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {suppliers.map((row, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                   
                                    <td>{row.name}</td>
                                    <td>{row.product}</td>
                                    <td>{row.category}</td>
                                    <td>{row.address}</td>
                                    <td>
                                        <span>
                                            <button className="icon-btn" onClick={() => viewSupplier(row)}>
                                                <BsEye size={18} color="blue" />{" "}
                                            </button>
                                            <button className="icon-btn" onClick={() => editSupplier(row)}>
                                                <BsPencilSquare size={18} color="black" />{" "}
                                            </button>
                                            <button className="icon-btn" onClick={() => deleteRow(row._id)}>
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

            {selectedSupplier && (
                <SupplierView
                    name={selectedSupplier.name}
                    description={selectedSupplier.description}
                    category={selectedSupplier.category.name}
                    price={selectedSupplier.price}
                    qty={selectedSupplier.quantity}
                    onClose={closeDetails}
                />
            )}
            {editedSupplier && (
                <SupplierEdit
                    id={editedSupplier._id}
                    name={editedSupplier.name}
                    description={editedSupplier.description}
                    category={editedSupplier.category.name}
                    price={editedSupplier.price}
                    qty={editedSupplier.quantity}
                    onClose={() => {
                        closeEditDetails();
                        updateSupplierList();
                    }}
                />
            )}

            {showPopup && (
                <div className="modal" style={{ display: 'block' }}>
                    <div className="modal-dialog" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Are you sure you want to delete this supplier?</h5>
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
}
