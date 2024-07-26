import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TextField, Button, Typography, Box } from '@mui/material';
import api from '../../services/api';
import axios from 'axios';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      await api.post('/auth/register', { firstName, lastName, email, password });
      navigate('/login');
    } catch (err) {
      const errorMsg = err.response?.data?.msg || 'An error occurred. Please try again.';
      setError(errorMsg);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/register', { firstName, lastName, email, password });
      navigate('/login');
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto', p: 3 }}>

      <Typography variant="h5" gutterBottom>
        Sign Up
      </Typography>

      {error && (
        <Typography color="error" variant="body2" gutterBottom>
          {error}
        </Typography>
      )}

      <div>
        <TextField
          fullWidth
          type="text"
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          margin="normal"
        />
      </div>

      <div>
        <TextField
          fullWidth
          type="text"
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          margin="normal"
        />
      </div>

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

      <div>
        <TextField
          fullWidth
          type="password"
          label="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          margin="normal"
        />
      </div>

      <Button type="submit" variant="contained" color="primary" fullWidth>
        Register
      </Button>

      <Box mt={2} textAlign="center">
        <Typography variant="body2">
          Already have an account? <Link to="/login">Login</Link>
        </Typography>
      </Box>

      <Box mt={2} display="flex" justifyContent="center">
        <Button 
          variant="contained" 
          sx={{ backgroundColor: 'blue', textTransform: 'none' }}
          href='/auth/google' //change for passportjs register
          onSubmit={handleRegister}
        >
          Sign up with <span style={{ fontWeight: 'bold' }}>Google</span>
        </Button>
      </Box>
      
    </Box>
  );
};

export default Register;
