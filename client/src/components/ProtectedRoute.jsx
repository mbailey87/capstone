import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem('token'); // Check if token exists

  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/student-login" />;
};

export default ProtectedRoute;
