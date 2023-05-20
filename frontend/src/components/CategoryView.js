import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
function CategoryView() {
  return (
        <>
        <div class="card" 
        style={{
          border:'1px solid black',
          height:'300px',
          width:'640px',
          marginLeft:'auto',
          marginRight:'auto'
          
        }}
        >
  <div class="card-header">
    <b>View</b>
  </div>
  <div class="card-body">
    <h6 class="card-title">Name:</h6>
    <h6 class="card-text">Description:</h6>
    <p>Nepal is a landlocked Asian country bordered by the People's Republic of China to the north and India to the south, east and west. The Himalayan mountain range stretches through Nepal and the country is home to eight of the world's ten highest peaks, including Mount Everest (8,848m).
</p>
<div class='text-left'>
    <a href="#" class="btn btn-primary">Cancel</a>
    </div>
  </div>
</div>
        </>
  );
}

export default CategoryView
