// config/database.js

const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB connection configuration
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.once('open', () => {
        console.log('Connected to MongoDB');
    });
  } catch (error) {
    console.error(`MongoDB connection error: ${error}`);
  }
};

module.exports = connectToDatabase;
