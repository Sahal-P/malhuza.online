// models/user.js

const mongoose = require('mongoose');

// Example MongoDB model for a user
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  // Add more fields as needed
});

const User = mongoose.model('User', userSchema);

module.exports = User;
