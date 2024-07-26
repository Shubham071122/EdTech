import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
  let token = null;
  token = localStorage.getItem('token');

  return token ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
