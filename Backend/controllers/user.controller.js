const userModel=require('../models/user.model.js');
const userService=require('../services/user.services.js');
const {validationResult}=require('express-validator');

module.exports={
    registerUser:async(req,res,next)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        try{
            const user=await userService.createUser(req.body);
            res.status(201).json({user});
        }catch(err){
            next(err);
        }

        const {firstName, lastName, email, password} = req.body;
        if(!firstName||!lastName||!email||!password){
            return res.status(400).json({message:'All fields are required'});
        }

        const hashedPassword=await userModel.hashPassword(password);
        const user=await userService.createUser({firstName, lastName, email, password:hashedPassword});

        const token=user.generateAuthToken();
        res.status(201).json({user, token}); 
    }
}