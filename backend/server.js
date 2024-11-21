const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const cors = require('cors');
const passport = require('passport');
const dotenv = require('dotenv');

// Load config
dotenv.config({ path: './.env' });

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());
app.use(cors());

// Initialize Passport
app.use(passport.initialize());

// Define Routes
app.use('/api/auth', authRoutes);  // Now, use '/api/auth' for all auth-related routes
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes); // Fixed path to '/api/tasks' if tasks route exists

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
