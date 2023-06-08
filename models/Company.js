const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  siege:{
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  
  password: {
    type: String,
    required: true,
    minlength: 8
  }
  
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
