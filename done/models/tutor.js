const mongoose=require('mongoose');


//Tutor Schema
const TutorSchema = mongoose.Schema({
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
  },

  educationalb:{
    type:String,
    required: true
  }
}, {collection: 'tutor'});

const Tutor=module.exports=mongoose.model('Tutor', TutorSchema, "tutors");
