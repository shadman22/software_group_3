const express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs');
const passport=require('passport');

let Employer=require('../models/employer');
let Freelancer=require('../models/freelancer');

//Register form

router.get('/register', function(req,res){
  res.render('employer_register');
});

//Register Submit

router.post('/register', function(req,res){
  const name=req.body.name;
  const username=req.body.username;
  const email=req.body.email;
  const contact=req.body.contact;
  const password=req.body.password;
  const password1=req.body.password1;


  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Enter valid email').isEmail();
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'password is required').notEmpty();
  req.checkBody('password1', 'Passwords do not match').equals(req.body.password);

  let errors=req.validationErrors();

  if(errors){
    res.render('employer_register',{
      errors:errors
    });
  }else{
    let newEmployer= new Employer({
      name:name,
      email:email,
      username:username,
      contact:contact,
      password:password

    });
    bcrypt.genSalt(10, function(err,salt){
      bcrypt.hash(newEmployer.password, salt, function(err, hash){
        if(err){
          console.log(error);
        }
        newEmployer.password=hash;
        newEmployer.save(function(err){
          if(err){
              console.log(err);
              return;
          }
          else{
            req.flash('success', 'You are now registered on done!');
            res.redirect('/employers/login');
          }
        });
      });
    });
  }

});
//Login form get request
router.get('/login', function(req,res){
  res.render('employer_login');
});

//Login post request

router.post('/login',function(req,res,next){
  passport.authenticate('local-employer', {
    successRedirect:'/',
    failureRedirect:'/employers/login',
    failureFlash:true
  })(req,res,next);
});




//logout
router.get('/logout', function(req,res){
  req.logout();
  req.flash('success', 'You are logged out');
  res.redirect('/employers/login');
});
module.exports=router;
