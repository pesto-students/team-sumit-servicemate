const mongoose = require('mongoose');
const HouseholdWorkCategories = ['plumbing', 'electrician', 'gardening', 'cleaning', 'painting'];
const categorySchema = new mongoose.Schema({
    catagories:{
        type: String,
        enum: HouseholdWorkCategories,
        required: true,
       },
  });
  
  const Category = mongoose.model('Category', categorySchema);
  module.exports = Category;