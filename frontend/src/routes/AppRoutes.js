import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate  } from 'react-router-dom';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';
import Board from '../components/Board/Board';
import PrivateRoute from '../routes/PrivateRoute'; 

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/board" element={<PrivateRoute><Board/></PrivateRoute>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
