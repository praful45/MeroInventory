import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter, Link } from 'react-router-dom';
import axios from 'axios';

export default function ProductEdit(props) {
  const [name, setName] = useState(props.name || '');
  const [address, setAddress] = useState(props.address || '');
  const [number,setNumber]=useState(props.number || '');
  const [email,setEmail]=useState(props.email || '');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
  e.preventDefault();

    const data = {
      name,
      address,
      number,
      email
    };
  
    axios.put(`http://localhost:5000/api/updateproduct/${props.id}`, data)
      .then((response) => {
        if (response.status === 200) {
          setName("");
          setAddress("");
          setNumber("");
          setEmail("");
          props.onClose()

        } else {
          alert("Error updating supplier");
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
            marginLeft: 'auto',
            marginRight: 'auto',
            justifyContent: 'center',
            alignItems: 'center',
            width: '700px',
            height: '720px',
            border: '2px solid black',
            borderRadius: '10px',
            boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
            backgroundColor:'white'
          }}
        >
          
          <form onSubmit={handleSubmit}>
            <div className="form">
              <div className="w-90 p-3 mb-2 text-dark" style={{ fontSize: '20px' }}>
                <b>Edit Supplier</b>
              </div>
              <hr className="hr" />
              <div className="w-90 p-1">
                <label htmlFor="suppliername" className="form-label">
                  <b>Supplier Name</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="suppliername"
                  placeholder="Enter Supplier Name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>

              <div className="w-90 p-1">
                <label htmlFor="address" className="form-label">
                  <b>Address</b>
                </label>
                <textarea
                  className="form-control"
                  id="supplierAddress"
                  placeholder="Enter address of supplier"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows="3"
                ></textarea>
              </div>
              <div className="w-90 p-1">
                <label htmlFor="number" className="form-label">
                  <b>Phone Number</b>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="number"
                  placeholder="Enter Phone Number"
                  onChange={(e) => setNumber(e.target.value)}
                  value={number}
                />
              </div>
              <div className="w-90 p-1">
                <label htmlFor="email" className="form-label">
                  <b>Email</b>
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div className="form-group">
                <label className="col-md-4 control-label" htmlFor="submit"></label>
                <div className="gap-2 d-flex justify-content-md-end">
                <button onClick={props.onClose} className="btn btn-primary">Cancel</button>
                  <button  type='submit' id="submit" name="submit" className="btn btn-primary" value="1">
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