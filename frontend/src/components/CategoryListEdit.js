import React, { useState } from 'react';
import { Link } from 'react-router-dom'
// import Data from './data.json';

export default function CategoryListEdit() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic here
    // For example, you can send a POST request to your backend API
    // to handle the form data and create a new product category

    // Redirect to the product category list page
    window.location.href = "/product-categories";
  };

  return (
    <>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous"></link>
      <div className="w-90 p-3"
        style={{

          marginLeft: 'auto',
          marginRight: 'auto',
          justifyContent: 'center',
          alignItems: 'center',
          width: '700px',
          height: '440px',
          border: '2px solid black',
          borderRadius: '10px',
          boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',

        }}
      >


        <form onSubmit={handleSubmit}>
          <div className='form'>
            <div className="w-90 p-3 mb-2  text-dark" style={{ fontSize: '20px' }} ><b>Edit Category</b></div>
            <hr className="hr" />
            <div className="w-90 p-3">
              <label for="categoryname" className="form-label">
                <b>Category Name</b>
              </label>
              <input
                type="text"
                className="form-control"
                id="categoryname"
                placeholder="Enter Category Name"
                onChange={(e) => setName(e.target.value)}
                value="Mobile"
              />
            </div>

            <div className="w-90 p-3">
              <label for="description" className="form-label">
                <b> Description</b>
              </label>
              <textarea
                className="form-control"
                id="categoryDescription"
                placeholder="Enter description of category"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="3"
              ></textarea>
            </div>
            <div className="form-group">
              <label className="col-md-4 control-label" for="submit"></label>
              <div className=" gap-2 d-flex justify-content-md-end">
                {/* <button id="cancel" name="cancel" className="btn btn-default" >
                  Cancel
                </button> */}
                <Link to="/category" className="btn btn-default" role="button">
                  Cancel
                </Link>
                <button id="submit" name="submit" className="btn btn-primary" value="1">
                  Update
                </button>

              </div>
            </div>
          </div>
        </form>
      </div>

    </>
  );
}
