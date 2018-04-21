const LocalStrategy= require('passport-local').Strategy;
const Employer=require('../models/employer');
const Freelancer=require('../models/freelancer');
const config=require('../config/database');
const bcrypt=require('bcryptjs');


module.exports=function(passport){
  //LocalStrategy for Employers
  passport.use('local-employer',new LocalStrategy(function(username,password,done){
    //Match Username
    let query={username:username};
    Employer.findOne(query,function(err, user){
      if(err) throw err;
      if(!user){
        return done(null,false,{message: 'No employer found'});
      }
      //Match Password
      bcrypt.compare(password, user.password, function(err, isMatch){
        if(err) throw err;
        if(isMatch){
          return done(null,user);
        }else{
          return done(null,false,{message: 'Incorrect password'});

        }
      });

    });


    }));
    passport.serializeUser(function(user, done) {
      done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
      Employer.findById(id, function(err, user) {
        done(err, user);
      });
    });

    //LocalStrategy for Freelancers
    passport.use('freelancer-local',new LocalStrategy(function(username,password,done){
      //Match Username
      let query={username:username};
      Freelancer.findOne(query,function(err, user){
        if(err) throw err;
        if(!user){
          return done(null,false,{message: 'No employer found'});
        }
        //Match Password
        bcrypt.compare(password, user.password, function(err, isMatch){
          if(err) throw err;
          if(isMatch){
            return done(null,user);
          }else{
            return done(null,false,{message: 'Incorrect password'});

          }
        });

      });


      }));

    passport.serializeUser(function(user, done) {
      done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
      Freelancer.findById(id, function(err, user) {
        done(err, user);
      });
    });
}
