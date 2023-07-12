const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../config/generateToken');

const register = asyncHandler(async(req,res)=>{
    const { name, phoneNo, email, password, userType, address } = req.body;

  // Check if all required fields are provided
  if (!name || !phoneNo || !email || !password || !address) {
    res.status(400);
    throw new Error('Please provide all the required information.');
  }

  // Check if the user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists.');
  }

  // Create a new user
  const newUser = await User.create({
    name,
    phoneNo,
    email,
    password,
    userType,
    address,
  });

  if (newUser) {
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      phoneNo: newUser.phoneNo,
      email: newUser.email,
      userType: newUser.userType,
      address: newUser.address,
      token: generateToken(newUser._id),
    });
  } else {
    res.status(400);
    throw new Error('User registration failed.');
  }
});

const login = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;
    console.log(email, password);
    if(!email||!password){
        res.status(400);
        throw new Error("please enter details correctly login");
        
    }
   
    const newUser = await User.findOne({email});
    
    if (newUser && (await newUser.passwordMatch(password))){
        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            password: newUser.password,
            token : generateToken(newUser._id),
    })

}else{
    res.send(400).json("mesage:error happend")
    
}

});


const appointment = asyncHandler(async(res,req)=>{
    const {userId}=req.body;
     const refUser =req.user._id;
     const value  = refUser.toString();
     if (!userId){
        console.log("userId not sent")
        return res.sendStatus(400)
     }



})
module.exports = {register,login,appointment};