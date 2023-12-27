// routes/index.js

const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();
router.use(authMiddleware);

// Import other routers
const userRoutes = require('./userRoutes');

// Use other routers
router.use('/users', userRoutes);

module.exports = router;
