const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const captainSchema=new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      trim: true,
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 6,
  },
  socketId:{
    type:String
  },
  status:{
    type:String,
    enum:['active','inactive'],
    default: 'inactive',
  },
  vehicle:{
    color:{
      type:String,
      required:true,
      minlength:3,
    },
    // model:{
    //   type:String,
    //   required:true,
    //   minlength:3,
    // },
    plate:{
      type:String,
      required:true,
      minlength:3,
    },
    capacity:{
      type:Number,
      required:true,
      min:[1,'Minimum capacity is 1'],
    },
    vehicleType:{
      type:String,
      enum:['car','motorcyle','auto'],
      required:true,
    },
    
  },
  location:{
    lat:{
      type:Number,
      //required:true,
    },
    lng:{
      type:Number,
      //required:true,
    }
  }
})

captainSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign(
    { _id: this._id, role: 'captain' }, 
    process.env.JWT_SECRET, 
    { expiresIn: '24h' }
  );
  return token;
};
captainSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
}

captainSchema.methods.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
}

const Captain=mongoose.model('Captain',captainSchema);
module.exports=Captain;