import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const [auth] = useContext(AuthContext);
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" />;
  }
  
  // If the user is not authenticated, redirect to login
  return auth.isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
