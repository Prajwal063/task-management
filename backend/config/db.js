const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load config
dotenv.config({ path: './.env' });

// console.log('MONGO_URI:', process.env.MONGO_URI);  // Debugging log

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('mongo connection error: ', err);
    process.exit(1);
  }
};

module.exports = connectDB;

