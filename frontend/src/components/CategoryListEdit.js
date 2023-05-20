import React, { useState } from 'react';
import Data from './data.json';

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
       <div class='form'>
      <div class="w-90 p-3 mb-2  text-dark" style={{ fontSize: '20px' }} ><b>Edit Category</b></div>
      <hr class="hr" />
        <div class="w-90 p-3">
          <label for="categoryname" class="form-label">
            <b>Category Name</b>
          </label>
          <input
            type="text"
            class="form-control"
            id="categoryname"
            placeholder="Enter Category Name"
            onChange={(e) => setName(e.target.value)}
            value="Mobile"
            />
        </div>

        <div class="w-90 p-3">
          <label for="description" class="form-label">
            <b> Description</b>
          </label>
          <textarea
            class="form-control"
            id="categoryDescription"
            placeholder="Enter description of category"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
          ></textarea>
        </div>
        <div class="form-group">
          <label class="col-md-4 control-label" for="submit"></label>
          <div class=" gap-2 d-flex justify-content-md-end">
          <button id="cancel" name="cancel" class="btn btn-default">
              Cancel
            </button>
            <button id="submit" name="submit" class="btn btn-primary" value="1">
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
