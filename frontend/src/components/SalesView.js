import React from 'react';
import './Card.css'
import './Dashboard.css';

const SalesView = (props) => {
  return (
    <div className="view-overlay">
      <div className="view-container">
        <div className="card">
          <div className="card-header">
            <b>View</b>
          </div>
          <div className="card-body">
            <h6 className="card-title">Name: </h6><p>{props.name}</p>
            <h6 className="card-text">Category: </h6><p>{props.category}</p>
            <h6 className="card-text">Order Date: </h6><p>{props.orderdate}</p>
            <h6 className="card-text">Customer Name: </h6><p>{props.customername}</p>
            <h6 className="card-text">Quantity: </h6><p>{props.quantity}</p>
            <h6 className="card-text">Status: </h6><p>{props.status}</p>
            <h6 className="card-text">Delivery Date: </h6><p>{props.deliverydate}</p>
            {/* <img className="product-image" src={`http://localhost:5000/uploads/${props.image}`} alt="Product Image" />  */}
            <div className="text-left">
              <button onClick={props.onClose} className="btn btn-primary">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesView;