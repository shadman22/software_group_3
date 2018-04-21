let mongoose=require('mongoose');

let jobSchema=mongoose.Schema({
  title:{
    type:String,
    required: true
  },
  postedby:{
    type:String,
    required:true
  },
  body:{
    type:String,
    required:true
  },
  assignedto:{
    type:String
  },
  amount: {
    type: String,
    required: true
  }

});

let Job=module.exports =mongoose.model('Job', jobSchema);
