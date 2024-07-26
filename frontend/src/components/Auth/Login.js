import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TextField, Button, Typography, Box } from '@mui/material';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [, setAuth] = useContext(AuthContext); 
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 

    try {
      const res = await api.post('/auth/login', { email, password });
      setAuth({
        isAuthenticated: true,
        token: res.data.token,
        user: res.data.user,
      });
      localStorage.setItem('token', res.data.token);
      navigate('/board');
    } catch (err) {
      // Handle errors
      const errorMsg = err.response?.data?.msg || 'An error occurred. Please try again.';
      setError(errorMsg);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      // Save the token to localStorage or manage it using context/state
      localStorage.setItem('token', response.data.token);
      navigate('/board');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto', p: 3 }}>

      <Typography variant="h5" gutterBottom>
        Login
      </Typography>

      {error && (
        <Typography color="error" variant="body2" gutterBottom>
          {error}
        </Typography>
      )}

      <div>
        <TextField
          fullWidth
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          margin="normal"
        />
      </div>
      
      <div>
        <TextField
          fullWidth
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          margin="normal"
        />
      </div>

      <Button type="submit" variant="contained" color="primary" fullWidth>
        Login
      </Button>

      <Box mt={2} textAlign="center">
        <Typography variant="body2">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </Typography>
      </Box>

      <Box mt={2} display="flex" justifyContent="center">
        <Button 
          variant="contained" 
          sx={{ backgroundColor: 'blue', textTransform: 'none' }}
          href='/auth/google' //change for passportjs login
          onSubmit={handleLogin}
        >
          Login with<span style={{ fontWeight: 'bold' }}>Google</span>
        </Button>
      </Box>

    </Box>
  );
};

export default Login;
