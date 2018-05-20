const express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs');
const passport=require('passport');

let Tutor=require('../models/tutor');


//Register form

router.get('/register', function(req,res){
  res.render('tutor_register');
});

//Register Submit

router.post('/register', function(req,res){
  const name=req.body.name;
  const username=req.body.username;
  const email=req.body.email;
  const contact=req.body.contact;
  const password=req.body.password;
  const password1=req.body.password1;
  const location=req.body.location;
  const age=req.body.age;
  const profession=req.body.profession;
  const specializaton=req.body.specializaton;
  const eduback=req.body.eduback;

//Req validations check

  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Enter valid email').isEmail();
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'password is required').notEmpty();
  req.checkBody('password1', 'Passwords do not match').equals(req.body.password);
  req.checkBody('age', 'Please enter age').notEmpty();
  req.checkBody('profession', 'Profession is required').notEmpty();
  req.checkBody('specializaton', 'Please enter your skills').notEmpty();
  req.checkBody('eduback', 'Please enter your skills').notEmpty();

  let errors=req.validationErrors();

//if error than show the required fields or message
  if(errors){
    res.render('tutor_register',{
      errors:errors
    });
  }else{
    let newTutor= new Tutor({
      name:name,
      email:email,
      username:username,
      contact:contact,
      password:password,
      location:location,
      age:age,
      profession:profession,
      specializaton:specializaton,
      educationalb:eduback

    });
    bcrypt.genSalt(10, function(err,salt){
      bcrypt.hash(newTutor.password, salt, function(err, hash){
        if(err){
          console.log(error);
        }
        newTutor.password=hash;
        newTutor.save(function(err){
          if(err){
              console.log(err);
              return;
          }

//else than registered will be done & show the success message
          else{
            req.flash('success', 'You are now registered as a tutor on done!');
            res.redirect('/');
          }
        });
      });
    });
  }

});
//View tutors
router.get('/viewtutors', function(req, res){
  Tutor.find({},function(err,tutors){
    if(err){
      console.log(err);
    }
    else{
    res.render('view_tutor',{
      title: 'Tutors available on done',
      tutors: tutors,
      specializaton: tutors.specializaton
    });}
  });

});

//Get single freelancer detail

router.get('/:id',function(req, res){
  Tutor.findById(req.params.id, function(err, tutors){
    res.render('tutor_detail',{
      tutors:tutors,
      name:tutors.name,
      specializaton: tutors.specializaton,
      email: tutors.email,
      contact: tutors.contact,
      eduback:tutors.educationalb
    });
  });
});




module.exports=router;
