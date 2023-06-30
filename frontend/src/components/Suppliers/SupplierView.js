import React from 'react';
import '../../components/Card.css'

const SupplierView = (props) => {
  return (
    <div className="view-overlay">
      <div className="view-container">
        <div className="card">
          <div className="card-header">
            <b>View</b>
          </div>
          <div className="card-body">
            <h6 className="card-title">Name: </h6><p>{props.name}</p>
            <h6 className="card-text">Address: </h6><p>{props.address}</p>
            <h6 className="card-text">Phone Number: </h6><p>{props.number}</p>
            <h6 className="card-text">Email: </h6><p>{props.email}</p>
            <div className="text-left">
              <button onClick={props.onClose} className="btn btn-primary">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierView;