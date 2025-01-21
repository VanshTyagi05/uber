const BlacklistToken = require("../models/blacklistToken.model");
const userModel = require("../models/user.model");
const Captain=require('../models/captain.model');
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

module.exports.authCaptain=async(req,res,next)=>{
  try{
    // sabse pehle token ko get kro  ya toh coookie se ya toh bearer token se
    const token=req.cookies?.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
    if(!token){
      // agar token nahi mila toh unauthorized status code bhejo
      return res.status(401).json({message:'You are not authenticated'});
    }
    const isBlacklisted=await BlacklistToken.isTokenBlacklisted(token);
    if(isBlacklisted){
      return res.status(401).json({message:'Token is blacklisted'});
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    const captain=await Captain.findById(decoded._id);
    if(!captain){
      return res.status(401).json({message:'Captain not found'});
    }
    req.captain=captain;
    req.token=token;
    next();
  }catch(error){
    return res.status(401).json({message:'Token is not valid'});
  }
}