const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../config/generateToken');
const ServiceProvider = require('../models/serviceProvideModel');
const Appointment = require('../models/appointmentBookingModel ');


const register = asyncHandler(async(req,res)=>{
    const { name, phoneNo, email, password, userType, address, profile } = req.body;

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
    profile,
  });

  if (newUser) {
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      phoneNo: newUser.phoneNo,
      email: newUser.email,
      userType: newUser.userType,
      address: newUser.address,
      profile:newUser.profile,
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

const appointment = asyncHandler(async (req,res) => {
  const loginUser = req.user;
  console.log(loginUser.name)

  const { serviceProviderId,service, appointmentDate } = req.body;

  const serv = await ServiceProvider.findById(serviceProviderId);
  console.log("serviceprovide_id"+ serv.serviceProviderName)
  const newAppointment = new Appointment({
    serviceProvider: serv._id,
    serviderProviderName : serv.serviceProviderName,
    mobile:serv.phoneNo,
    service: service,
    userId:loginUser._id,
    userName: loginUser.name,
    userAddress:loginUser.address,
    appointmentDate,
  });
  const appointment = await newAppointment.save();
  if (appointment){
    res.status(200).json({ data: appointment });
  }
  else{
    res.status(200).json({ mesaage:"appointmemt not booked" });
  }
});

const fetchAppointment = asyncHandler(async(req,res)=>{
  const userId = req.user._id;

  console.log(userId)
  const appointments = await Appointment.find({ user: userId })
    .populate("serviceProvider")
    .populate("userId")
    .populate("service")
    .exec();

  res.status(200).json({ data: appointments });
})

  
module.exports = {register,login,appointment,fetchAppointment};