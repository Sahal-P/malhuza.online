// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Example route to get all users
router.get('/', userController.getAllUsers);

// Add more routes as needed

module.exports = router;
