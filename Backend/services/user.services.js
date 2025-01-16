const userModel = require('../models/user.model.js');

module.exports.createUser = async ({ firstname, lastname, email, password }) => {
  // Validate required fields
  if (!firstname || !email || !password) {
    throw new Error('All fields (firstName, email, and password) are required - user service error message');
  }

  try {
    // Create the user
    const user = await userModel.create({
      fullname: {
        firstname,
        lastname,
      },
      email,
      password, // Password should already be hashed
    });

    return user;
  } catch (error) {
    // Handle database or other errors
    throw new Error(`Error creating user: ${error.message}`);
  }
};
