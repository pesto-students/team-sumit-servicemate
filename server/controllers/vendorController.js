const Category = require('../models/catagoriesModel');
const ServiceProvider = require('../models/serviceProvideModel');
const Services = require('../models/servicesModel');
const asyncHandler = require('express-async-handler');


const catagoriesRegistration = asyncHandler(async(req,res)=>{
    const { catagories, services,description, price } = req.body;
    const serviceProvider1 = await ServiceProvider.findById(req.user._id);
    console.log(serviceProvider1);
    const serviceProvider= req.user._id;
    const serviceProviderId = serviceProvider.toString();
    console.log(serviceProvider1.serviceProviderName)
    const existingCategory = await Category.findOne({catagories });
    
    let categoryId;
    if (existingCategory) {
      // If the category exists, retrieve its ID
      categoryId = existingCategory._id;
      console.log(categoryId);
    } else {
      const newCategory = await Category.create({ catagories: catagories });
    categoryId = newCategory._id;
  }
    const service = await new Services({
        catagories: categoryId,
        services : services,
        description:description,
        serviceProvider:serviceProvider1.serviceProviderName,
        serviceProviderId : serviceProviderId,
            price: price
          
    });
    
    await service.save()
  .then(async(result) => {
    console.log('Document inserted:', result);
     serviceProvider1.service.push(result._id);
    await serviceProvider1.save();
    res.status(200).json({ message: "Service registered successfully" });
  })
  .catch((error) => {
    console.error('Error inserting document:', error);
    res.status(500).json({ error: error.message });
  });

})



const searchCatagories = asyncHandler(async (req, res) => {
  const { search } = req.query;
  const regexSearch = new RegExp(search, "i");

  const categories = await Category.find({
    catagories: regexSearch
  }).select('_id');
  const serviceProvider = await ServiceProvider.find({
    serviceProviderName: regexSearch
  }).select('_id');

  console.log(serviceProvider)

  const services = await Services.find({
    $or: [
      {services:regexSearch},
      { "serviceProvider":{$in : serviceProvider} },
      { "catagories": { $in: categories } },
    ],
  })
    .populate({
      path: "catagories",
      select: "catagories",
    })
    .populate("serviceProvider")
    .exec();

  res.send(services);
});

const searchService = asyncHandler(async (req, res) => {
  const { catagories } = req.body;

  let services;

  if (!catagories) {
    services = await Services.find()
      .populate({
        path: "catagories",
        select: "catagories",
      })
      .populate({
        path: "serviceProviderId",
        model: "ServiceProvider",
      })
      .exec();
  } else {
    const regexSearch = new RegExp(catagories, "i");

    const categories = await Category.find({
      catagories: regexSearch
    }).select('_id');

    const serviceProvider = await ServiceProvider.find({
      serviceProviderName: regexSearch
    }).select('_id');

    services = await Services.find({
      $or: [
        { services: regexSearch },
        { "serviceProvider": { $in: serviceProvider } },
        { "catagories": { $in: categories } },
      ],
    })
      .populate({
        path: "catagories",
        select: "catagories",
      })
      .populate({
        path: "serviceProvider",
        model: "ServiceProvider",
      })
      .exec();
  }

  res.send(services);
});
const vendorDetails = asyncHandler(async(req,res)=>{
  try {
    const {
      serviceProviderName,
      serviceProviderEmalId,
      workingAs,
      employeeData,
      service,
      openHours,
      portfolio,
      memberShip,
      status
    } = req.body;

    const serviceProviderExists = await ServiceProvider.findOne({ serviceProviderEmalId });
  if (serviceProviderExists) {
    res.status(400);
    throw new Error('User already exists.');
  }
    // Create new service provider
    const newServiceProvider = await ServiceProvider.create({
      serviceProviderName,
      serviceProviderEmalId,
      workingAs,
      employeeData,
      service,
      openHours,
      portfolio,
      memberShip,
      status
    });

   console.log(newServiceProvider) // Save new service provider
    await newServiceProvider.save();
    if (newServiceProvider){
    res.status(201).json({ message: 'Service provider created successfully', data: newServiceProvider });
  }
  else{
    res.status(400);
    throw new Error('User registration failed.');
  }
  } catch (error) {
    res.status(400).json({ message: 'Error creating service provider', error: error.message });
  }

});
const ProviderDetails = asyncHandler(async(req,res)=>{
  const {serviceId,serviceName }=req.body
  let proivderDeatils
  if (serviceName){
    const serviceids= await Services.find({services:{ $in: serviceName }})
    const serviceIdArray = serviceids.map(service => service._id)
    
    console.log(serviceIdArray)
     proivderDeatils = await ServiceProvider.find({service:{ $in: serviceIdArray }})
     .populate({
      path: 'service' ,
      model: 'Service',
    });
  }
 else{
   proivderDeatils = await ServiceProvider.find({service:serviceId})
   .populate({
    path: 'service',
    select: 'price',
  });
  }
  res.send(proivderDeatils);
});


module.exports = {searchCatagories,catagoriesRegistration,searchService,vendorDetails,ProviderDetails};