import React, { useState } from "react";
import Data from './data.json';
import {BsEye, BsFillTrashFill, BsPencilSquare} from "react-icons/bs";

export default function CategoryList() {
  const [data] = useState(Data);

  return (
    <div className= <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous"></link>>
      <h2>Categories</h2>
      <hr class="hr" />

      <h2>Category List</h2>
      <hr class="hr" />
    
      <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Categories</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  
  <tbody>
      
       {data.map((row, index) => (
          <tr key={index}>
             <td>{row.id}</td>
             <td>{row.categories}</td>
             <td>
              <span>
              <a href="#"><BsEye size={18} color="blue" /> </a>
              <a href="#"> <BsPencilSquare size={18} color="black"/> </a>
              <a href="#"> <BsFillTrashFill size={18} color="red"/> </a>
              </span>
             </td>
           
           </tr>
         ))}
     </tbody>
  
</table>
     </div> 
     
   
  );
}
