import React from 'react';
import { Link } from 'react-router-dom';

const Card = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
      <h3 className="text-xl font-semibold mb-2">Book</h3>
      <p className="text-lg mb-4">Price: $50</p>
      <Link to="/payment">
        <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Buy Now
        </button>
      </Link>
    </div>
  );
};

export default Card;
