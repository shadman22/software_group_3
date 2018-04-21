const mongoose=require('mongoose');


//Employer Schema
const EmployerSchema = mongoose.Schema({
  name:{
    type:String,
    required: true
  },
  username:{
    type:String,
    required: true
  },
  email:{
    type:String,
    required: true
  },
  password:{
    type:String,
    required: true
  },
  contact:{
    type:String

  }
});

const Employer=module.exports=mongoose.model('Employer', EmployerSchema);
