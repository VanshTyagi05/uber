const express = require('express');
const router = express.Router();
const {body}=require('express-validator');

//const userController=require('../controllers/user.controller');
const captainController=require('../controllers/captain.controller');

router.post('/register',[
  body('email')
    .isEmail()
    .withMessage('Invalid email')
    .normalizeEmail(),
  body('fullname.firstname')
    .trim()
    .isLength({min:3})
    .withMessage('First name must be at least 3 characters'),
  body('fullname.lastname')
    .trim()
    .isLength({min:3})
    .withMessage('Last name must be at least 3 characters'),
  body('password')
    .isLength({min:6})
    .withMessage('Password must be at least 6 characters'),
  body('vehicle.color')
    .trim()
    .isLength({min:3})
    .withMessage('Color must be at least 3 characters'),
  body('vehicle.plate')
    .trim()
    .isLength({min:6})
    .withMessage('License plate must be at least 6 characters'),
  body('vehicle.capacity')
    .isInt({ min: 1, max: 10 })
    .withMessage('Capacity must be between 1 and 10'),
  body('vehicle.vehicleType')
    .isIn(['car','motorcycle','auto'])
    .withMessage('Invalid vehicle type')
], captainController.registerCaptain);

module.exports=router;