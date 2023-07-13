const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  geoCode: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  }
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;