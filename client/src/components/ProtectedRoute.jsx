import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, isLoggedIn, isAdmin }) => {
  const token = localStorage.getItem('token');
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  const payload = JSON.parse(atob(token.split('.')[1]));
  const userIsAdmin = payload.admin;

  if (isAdmin !== undefined && userIsAdmin !== isAdmin) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Component />;
};

export default ProtectedRoute;
