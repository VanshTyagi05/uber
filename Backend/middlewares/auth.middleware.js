const BlacklistToken = require("../models/blacklistToken.model");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

module.exports.authUser = async (req, res, next) => {
  try {
    // Get token from cookie or bearer token
    const token = req.cookies?.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

    if (!token) {
      return res.status(401).json({ message: 'You are not authenticated' });
    }

    // Check if token is blacklisted using BlacklistToken model
    const isBlacklisted = await BlacklistToken.isTokenBlacklisted(token);
    if (isBlacklisted) {
      return res.status(401).json({ message: 'Token is blacklisted' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user details
    const user = await userModel.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Attach user to request
    req.user = user;
    req.token = token; // Add token to request for logout
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

