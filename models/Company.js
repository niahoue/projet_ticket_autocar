const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
     unique:true
  },
  email: {
    type: String,
    required: true,
    unique:true
  },
  siege:{
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true,
    unique:true
  },
  
  password: {
    type: String,
    required: true,
    minlength: 8
  },
   createdAt: {
     type: Date,
     default: Date.now
   }, 
   updatedAt: {
    type: Date,
     default: Date.now
   }
  
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
