const userModel = require("../models/user.model.js");
const userService = require("../services/user.services.js");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

module.exports = {
  registerUser: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //  console.log(req.body);
    const { fullname, email, password } = req.body;

    // Check if required fields are present
    if (!fullname || !email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required - user controller error" });
    }

    try {
      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
      });

      // Generate JWT token
      const token = user.generateAuthToken();

      // Send response
      res.status(201).json({ user, token });
    } catch (err) {
      next(err);
    }
  },
};

module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  // Validate required fields
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "All fields are required - user controller error" });
  }

  try {
    // Find user by email and include the password field for validation
    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials (user not found) - user controller error",
      });
    }

    // Check if the password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials (password) - user controller error",
      });
    }

    // Generate JWT token
    const token = user.generateAuthToken();
    res.cookie('token', token);
    // Remove the password field before sending the response
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    // Send success response
    res.status(200).json({ user: userWithoutPassword, token });
  } catch (err) {
    next(err); // Pass any unexpected errors to the global error handler
  }
};

module.exports.getProfile = async (req, res, next) => {
    try {
        const user = req.user;
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
}
