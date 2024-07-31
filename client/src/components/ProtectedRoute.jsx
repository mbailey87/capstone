import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, isAdmin, ...rest }) => {
  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem('token');

  if (location.pathname.startsWith('/admin') && !isAdmin) {
    return <Navigate to="/admin-login" />;
  }

  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/student-login" />;
};

export default ProtectedRoute;
