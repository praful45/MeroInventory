import React, { useEffect, useState } from "react";
import { BsEye, BsFillTrashFill, BsPencilSquare } from "react-icons/bs";
import { Link } from 'react-router-dom'
import axios from 'axios';
import CategoryView from "./CategoryView";
import '../App.css'

//remove this const Data and its usesate after applying axios get properly
const Data = [
  { name: "hello" },
  { name: "hello" },
  { name: "hello" },
  { name: "hello" },
  { name: "hello" },
  { name: "hello" },
]

export default function CategoryList() {
  const [data, setData] = useState(Data)
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

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
                  {/* <Link to="/category-view">
                    <BsEye size={18} color="blue" />{" "}
                  </Link> */}
                  <button className="icon-btn" onClick={() => viewCategory(row)}>
                    <BsEye size={18} color="blue" />{" "}
                  </button>
                  <Link to="/category-edit">
                    {" "}
                    <BsPencilSquare size={18} color="black" />{" "}
                  </Link>
                  <Link to="/category-delete">
                    {" "}
                    <BsFillTrashFill size={18} color="red" />{" "}
                  </Link>
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
    </div>
  );
}
