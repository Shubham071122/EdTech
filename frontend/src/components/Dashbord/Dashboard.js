import React from 'react';
import Card from './Card';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    localStorage.clear('token');
    navigate('/');
  };

  return (
    <div className="p-6 sm:px-16 bg-gray-100 min-h-screen">
      <div className="w-ful flex flex-row justify-between mb-20">
        <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
        <button
          className="px-5 bg-blue-500 text-white rounded-md"
          onClick={handleClick}
        >
          Logout
        </button>
      </div>

      <Card />
    </div>
  );
};

export default Dashboard;
