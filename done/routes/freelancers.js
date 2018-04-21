const express=require('express');
const router=express.Router();

const bcrypt=require('bcryptjs');
const passport=require('passport');

let Freelancer=require('../models/freelancer');


//Register form

router.get('/register', function(req,res){
  res.render('freelancer_register');
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


  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Enter valid email').isEmail();
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'password is required').notEmpty();
  req.checkBody('password1', 'Passwords do not match').equals(req.body.password);
  req.checkBody('age', 'Please enter age').notEmpty();
  req.checkBody('profession', 'Profession is required').notEmpty();
  req.checkBody('specializaton', 'Please enter your skills').notEmpty();
  let errors=req.validationErrors();

  if(errors){
    res.render('freelancer_register',{
      errors:errors
    });
  }else{
    let newFreelancer= new Freelancer({
      name:name,
      email:email,
      username:username,
      contact:contact,
      password:password,
      location:location,
      age:age,
      profession:profession,
      specializaton:specializaton

    });
    bcrypt.genSalt(10, function(err,salt){
      bcrypt.hash(newFreelancer.password, salt, function(err, hash){
        if(err){
          console.log(error);
        }
        newFreelancer.password=hash;
        newFreelancer.save(function(err){
          if(err){
              console.log(err);
              return;
          }
          else{
            req.flash('success', 'You are now registered on done!');
            res.redirect('/freelancers/login');
          }
        });
      });
    });
  }

});

router.get('/login', function(req,res){
  res.render('freelancer_login');
});
//Login post request

router.post('/login',function(req,res,next){
  passport.authenticate('freelancer-local', {
    successRedirect:'/',
    failureRedirect:'/freelancers/login',
    failureFlash:true
  })(req,res,next);
});






module.exports=router;
