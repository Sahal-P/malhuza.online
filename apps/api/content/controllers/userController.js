// controllers/userController.js

const User = require('../models/user');

const userController = {
  // Example function to get all users
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.render('users/index', { users });
    } catch (error) {
      console.error(`Error fetching users: ${error}`);
      res.status(500).send('Internal Server Error');
    }
  },
  // Add more controller functions as needed
};

module.exports = userController;
