const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: './.env' });

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    // Ensure that MONGO_URI is available in the .env file
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI not defined in the environment variables.");
    }

    // Connect to MongoDB with options to handle deprecations (without the removed options)
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,       // MongoDB URL parser
      useUnifiedTopology: true,   // Use new server discovery and monitoring engine
    });

    console.log('MongoDB Connected...');
  } catch (err) {
    // Handle connection errors
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
