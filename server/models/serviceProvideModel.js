const mongoose = require("mongoose");
const serviceProviderModal = mongoose.Schema({
    serviceProviderName :{
          type:String,
          trim : true,
          required:true
         },
         serviceProviderEmalId:{
            type:String,
            trim : true,
            required : true
         },
         workingAs:{
            type: String,
            enum: ['Freelancer', 'Vendor']
         },
         employeeData:[{
             type:mongoose.Schema.Types.ObjectId,
             ref:"EmployeeData"
         }],
         service:[{
          type:mongoose.Schema.Types.ObjectId,
          ref:"Services"
         }],
         openHours: [{
                location:[{
                 type:mongoose.Schema.Types.ObjectId,
                 ref : "Location"
                    }],
                    timeSlot:[{
                      day: {
                        type: String,
                        enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                        required: true
                      },
                      fromTime: {
                        type: String,
                        required: true
                      },
                      toTime: {
                        type: String,
                        required: true
                      }
                    }]    
         }],
         portfolio:{
              image:{
                type:String,
              
              },
              verified:{
                type:Boolean,
              }
            },
          createdOn: {
            type: Date,
            default: Date.now
          },
          updatedOn: {
            type:Date
          },
          rating  : {
            type:Number,
          },
          memberShip:[{
            name:{
                type:String
            },
            expireOn:{
                type:Date,
                required:true
            },
            activatedOn:{
                type:Date,
                required:true
            },
            status:{
                type:String,
                enum:["active","not active"]
            }

          }]

});

const ServiceProvider = mongoose.model("ServiceProvider",serviceProviderModal);
module.exports = ServiceProvider;
