import React, { useEffect, useState } from "react";
import { BsEye, BsFillTrashFill, BsPencilSquare } from "react-icons/bs";
import { Link } from 'react-router-dom'
import axios from 'axios';
import SalesView from "../../components/SalesView.js";
import SalesEdit from "../../components/SalesEdit.js";
import '../../App.css';
// import './Dashboard.css';

export default function ManageSalesOrder(props) {
    const [sales, setSales] = useState([]);
    const [selectedSales, setSelectedSales] = useState(null);
    const [editedSales, setEditedSales] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [deletingItemId, setDeletingItemId] = useState(null);


    // const fetchSales = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:5000/api/getAllProducts');
    //         setSales(response.data);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    // const updateManageSalesOrder = async () => {
    //     await fetchSales();
    // };
    // useEffect(() => {
    //     fetchSales();
    // }, []);



    const viewSales = (sales) => {
        setSelectedSales(sales);
    };

    const closeDetails = () => {
        setSelectedSales(null);
    };
    const closeEditDetails = () => {
        setEditedSales(null);
    };

    const deleteRow = (id) => {
        console.log(id);
        setDeletingItemId(id);
        setShowPopup(true);
    };

    const confirmDelete = () => {
        axios.delete(`http://localhost:5000/api/deleteproduct/${deletingItemId}`)
        setShowPopup(false);
        // updateManageSalesOrder();
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    const editSales = (sales) => {
        setEditedSales(sales);
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
                <h2>Sales</h2>
                <hr className="hr" />

                <h2>Status</h2>
                <hr className="hr" />

                <div className="table-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <table className="table table-striped text-center" style={{ width: '1300px', margin: 'auto' }}>
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                {/* <th scope="col">Image</th> */}
                                <th scope="col">Product Name</th>
                                <th scope="col">Category</th>
                                <th scope="col">Customer Name</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Status</th>
                                <th scope="col">Order Date</th>
                                <th scope="col">Delivery Date</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {sales.map((row, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    {/* <td><img className="product-image" src={`http://localhost:5000/uploads/${row.image}`} alt="Product Image" /></td> */}
                                    <td>{row.name}</td>
                                    <td>{row.category.name}</td>
                                    <td>{row.Customer.name}</td>
                                    <td>{row.quantity}</td>
                                    <td>{row.Status}</td>
                                    <td>{row.Order.Date}</td>
                                    <td>{row.Delivery.Date}</td>
                                    <td>
                                        <span>
                                            <button className="icon-btn" onClick={() => viewSales(row)}>
                                                <BsEye size={18} color="blue" />{" "}
                                            </button>
                                            <button className="icon-btn" onClick={() => editSales(row)}>
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

            {selectedSales && (
                <SalesView
                    name={selectedSales.name}
                    // description={selectedProduct.description}
                    category={selectedSales.category.name}
                    // price={selectedProduct.price}
                    customer={selectedSales.customer.name}
                    qty={selectedSales.quantity}
                    // image={selectedProduct.image}
                    status={selectedSales.status}
                    orderdate={selectedSales.order.date}
                    deliverydate={selectedSales.delivery.date}
                    onClose={closeDetails}
                />
            )}
            {editedSales && (
                <SalesEdit
                    id={editedSales._id}
                    name={editedSales.name}
                    // description={editedProduct.description}
                    category={editedSales.category.name}
                    customer={editedSales.customer.name}
                    quantity={editedSales.quantity}
                    status={editedSales.status}
                    orderdate={editedSales.order.date}
                    deliverydate={editedSales.delivery.date}

                    onClose={() => {
                        closeEditDetails();
                        // updateManageSalesOrder();
                    }}
                />
            )}

            {showPopup && (
                <div className="modal" style={{ display: 'block' }}>
                    <div className="modal-dialog" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Are you sure you want to delete this product?</h5>
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
