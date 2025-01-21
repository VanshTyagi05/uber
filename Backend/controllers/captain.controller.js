const captainModel = require("../models/captain.model.js");
const Captain = require("../models/captain.model.js");
const captainService = require("../services/captain.service.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const BlacklistToken = require("../models/blacklistToken.model.js");

module.exports.registerCaptain = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false,
        errors: errors.array() 
      });
    }

    const { fullname, email, password, vehicle } = req.body;

    // Check if captain exists
    const existingCaptain = await Captain.findOne({ email });
    if (existingCaptain) {
      return res.status(400).json({
        success: false,
        message: "Email already registered"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const captain = await captainService.createCaptain({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword,
      color: vehicle.color,
      plate: vehicle.plate,
      capacity: vehicle.capacity,
      vehicleType: vehicle.vehicleType,
    });

    const token = await captain.generateAuthToken();

    res.status(201).json({
      success: true,
      data: {
        captain: {
          _id: captain._id,
          fullname: captain.fullname,
          email: captain.email,
          vehicle: captain.vehicle
        },
        token
      }
    });
  } catch (err) {
    next(err);
  }
};

module.exports.loginCaptain = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false,
        errors: errors.array() 
      });
    }

    const { email, password } = req.body;

    const captain = await Captain.findOne({ email }).select("+password");
    if (!captain) {
      return res.status(404).json({
        success: false,
        message: "Email not found"
      });
    }

    const isMatch = await captain.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password"
      });
    }

    const token = await captain.generateAuthToken();
     
    res.cookie('token', token);
    res.json({
      success: true,
      data: {
        captain: {
          _id: captain._id,
          fullname: captain.fullname,
          email: captain.email,
          vehicle: captain.vehicle
        },
        token
      }
    });
  } catch (err) {
    next(err);
  }
}

module.exports.getCaptainProfile=async(req,res,next)=>{
  try {
    const captain = req.captain;
    res.json({ captain });
  } catch (err) {
    next(err);
  }
}
module.exports.logoutCaptain = async (req, res, next) => {
  try {
    // take token from the cookie
    const token = req.token;
   

    // Remove token cookie
    res.clearCookie('token');
    await BlacklistToken.create({ token });

    res.json({
      success: true,
      message: "Logged out successfully"
    });
  } catch (err) {
    next(err);
  }
}