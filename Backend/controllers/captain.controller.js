const captainModel = require("../models/captain.model.js");
const Captain = require("../models/captain.model.js");
const captainService = require("../services/captain.service.js");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

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