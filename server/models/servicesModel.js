const mongoose = require("mongoose");


const serviceSchema = new mongoose.Schema({
    
   catagories:[{
    type: mongoose.Schema.Types.ObjectId,
    ref : "Category"
   }],
   services : [String],
   serviceProvider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ServiceProvider",
    required: true
  },
    price: {
        type: Number,
        required: true
      }
 
});
const Services = mongoose.model("Service", serviceSchema);
module.exports = Services;
