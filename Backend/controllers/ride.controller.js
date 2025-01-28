const rideService=require('../services/ride.services');
const {validationResult}=require('express-validator');



module.exports.createRide=async(req,res,next) => {
  const error=validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({message: error.message});

  }
  const{ pickup,destination,vehicleType}=req.body;
  try {
    const ride=await rideService.createRide({user:req.user._id,pickup,destination ,vehicleType});
    return res.status(200).json({ride})
    
  } catch (error) {
    return res.status(400).json({message: error.message});

  }
}