const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.authUser=async(req,res,next)=>{
  const token = req.cookies?.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
     //console.log(req.headers.authorization.split(' ')[1]);
    if(!token){
        return res.status(401).json({message:'You are not authenticated'});
    }

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const user=await userModel.findById(decoded._id).select('+password');
        req.user=user;
        return next();
    }catch(error){
        res.status(401).json({message:'Token is not valid'});
    }

  }