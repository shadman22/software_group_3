const mongoose=require('mongoose');


//Freelancer Schema
const FreelancerSchema = mongoose.Schema({
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

  },
  location:{
    type:String,

  },
  age:{
    type:String,
    required: true
  },
  profession:{
    type:String,
    required: true
  },
  specializaton:{
    type:String,
    required: true
  }
});

const Freelancer=module.exports=mongoose.model('Freelancer', FreelancerSchema);
