const express=require('express');
const router=express.Router();
const { body } = require('express-validator');
const rideController=require('../controllers/ride.controller');
const authMiddleware=require('../middlewares/auth.middleware');
router.post('/create',
  
  // body('userId').isString().isLength({min:24, max:24 }).withMessage('Invalid UserID'),
  body('pickup').isString().isLength({min:3}).withMessage('invalid pickup'),
  body('destination').isString().isLength({min:3}).withMessage('Invalid destination'),  
  body('vehicleType').isString().isIn(['auto','car','moto']).withMessage('Invalid vehicle type'),
  authMiddleware.authUser,
  rideController.createRide
)

// exprt the route
module.exports =router;