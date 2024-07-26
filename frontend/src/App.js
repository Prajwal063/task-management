import React from 'react';
import Routes from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';
import './App.css';

const App = () => {
  return (
    <>
    <AuthProvider>
      <Routes />
    </AuthProvider>
    </>
    
  );
};

export default App;
