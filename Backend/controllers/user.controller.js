const userModel = require('../models/user.model.js');
const userService = require('../services/user.services.js');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

module.exports = {
  registerUser: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //  console.log(req.body);
    const { fullname,email, password } = req.body;

    // Check if required fields are present
    if (!fullname || !email || !password) {
      return res.status(400).json({ message: 'All fields are required - user controller error' });
    }

    try {
      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const user = await userService.createUser({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password: hashedPassword
      });

      // Generate JWT token
      const token = user.generateAuthToken();

      // Send response
      res.status(201).json({ user, token });
    } catch (err) {
      next(err);
    }
  }
};
