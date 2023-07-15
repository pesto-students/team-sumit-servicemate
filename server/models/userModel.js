const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phoneNo: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  userType: {
    type: Boolean,
    default: false
  },
  address: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String
  },
  profile: {
    type: String
  }
});

userSchema.methods.passwordMatch = async function (enterpassword) {
  return bcrypt.compare(enterpassword, this.password);
};

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }

  if (this.userType) {
    const ServiceProvider = mongoose.model('ServiceProvider');
    const serviceProvider = new ServiceProvider({
      _id: this._id,
      serviceProviderName: this.name,
      serviceProviderEmalId: this.email
    
    });

    await serviceProvider.save();
  }

  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;