import React from 'react';
import './Card.css'

const CategoryView = (props) => {
  return (
    <div className="view-overlay">
      <div className="view-container">
        <div className="card">
          <div className="card-header">
            <b>View</b>
          </div>
          <div className="card-body">
            <h6 className="card-title">Name: </h6>
            <h6 className="card-text">Description: </h6>
            <p>
              Nepal is a landlocked Asian country bordered by the People's Republic of China to the north and India to the south, east, and west. The Himalayan mountain range stretches through Nepal, and the country is home to eight of the world's ten highest peaks, including Mount Everest (8,848m).
            </p>
            <div className="text-left">
              <button onClick={props.onClose} className="btn btn-primary">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryView;
