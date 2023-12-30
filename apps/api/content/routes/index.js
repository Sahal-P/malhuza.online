const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();
// router.use(authMiddleware);

const contentRoutes = require('./contentRoutes');

router.use('/content', contentRoutes);

module.exports = router;
