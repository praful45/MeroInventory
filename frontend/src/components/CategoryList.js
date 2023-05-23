import React, { useEffect, useState } from "react";
import { BsEye, BsFillTrashFill, BsPencilSquare } from "react-icons/bs";
import { Link } from 'react-router-dom'
import axios from 'axios';
import CategoryView from "./CategoryView";
import '../App.css'


export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [deletingItemId, setDeletingItemId] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/getallcategories');
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const viewCategory = (category) => {
    setSelectedCategory(category);
  };

  const closeDetails = () => {
    setSelectedCategory(null);
  };
  const deleteRow = (id) => {
    setDeletingItemId(id);
    setShowPopup(true);
  };

    const confirmDelete = () => {
    // const updatedData = categories.filter((item) => item.id !== deletingItemId);
    // setCategories(updatedData);
    // setShowPopup(false);
  };

  const closePopup = () => {
    setShowPopup(false);
  };


  return (
    <div
      className=<link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ"
        crossorigin="anonymous"
      ></link>
    >
      <h2>Categories</h2>
      <hr className="hr" />

      <h2>Category List</h2>
      <hr className="hr" />

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">SN</th>
            <th scope="col">Categories</th>
            <th scope="col">Action</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((row, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{row.name}</td>
              <td>
                <span>
                  <button className="icon-btn" onClick={() => viewCategory(row)}>
                    <BsEye size={18} color="blue" />{" "}
                  </button>
                  <Link to="/category-edit">
                    {" "}
                    <BsPencilSquare size={18} color="black" />{" "}
                  </Link>
                  <button className="icon-btn" onClick={() => deleteRow(row.id)}>
                    <BsFillTrashFill size={18} color="red" />
                  </button>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedCategory && (
        <CategoryView
          name={selectedCategory.name}
          description={selectedCategory.description}
          onClose={closeDetails}
        />
      )}
      {showPopup && (
        <div className="modal" style={{ display: 'block' }}>
          <div
            className="modal-dialog"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Are you sure you want to delete this category?
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
  
}
