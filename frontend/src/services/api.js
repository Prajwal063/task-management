import axios from 'axios';

const api = axios.create({
  // baseURL: 'https://task-management-rlao.onrender.com/api',
  baseURL: 'http://localhost:3000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
});

export default api;
