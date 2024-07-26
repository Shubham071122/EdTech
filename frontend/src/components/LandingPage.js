import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-white">
      <h1 className="text-4xl font-bold mb-8">Welcome to EdTech</h1>
      <div className="bg-white text-black p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Get Started</h2>
        <div className="flex flex-col space-y-4">
          <Link to="/login">
            <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition duration-300">
              Signup
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
