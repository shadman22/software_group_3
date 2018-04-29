const express=require('express');
const path=require('path');
const bodyParser=require('body-parser')
const mongoose=require('mongoose');
const expressValidator=require('express-validator');
const flash=require('connect-flash');
const session=require('express-session');
const passport=require('passport');

const config=require('./config/database');


mongoose.connect(config.database);
let db=mongoose.connection;

//checking connection
db.once('open',function(){
  console.log('Connected to mongodb');
});

//checking for db errors
db.on('error',function(err){
    console.log(err);
});
//initialiizing app variable
const app=express();
//bringing in job model

let Job=require('./models/job');
let Freelancer=require('./models/freelancer');
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'pug');

//bodyparser for json
app.use(bodyParser.urlencoded({extended:false}));

app.use(bodyParser.json());


//set public folder
app.use(express.static(path.join(__dirname, 'public')));

//express session middleware

app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,

}))

//express messages middleware

app.use(require('connect-flash')());
app.use(function(req,res,next){
  res.locals.messages=require('express-messages')(req,res);
  next();
});

//express validator middleware
app.use(expressValidator({
  errorFormatter: function(param,msg,value){
      var namespace=param.split('.'),
      root=namespace.shift(),
      formParam=root;

      while(namespace.length){
        formParam +='[' + namespace.shift() + ']';
      }

      return {
        param: formParam,
        msg: msg,
        value: value
      };
  }
}));

//configuration for passport

require('./config/passport')(passport);
//Passport middleware
app.use(passport.initialize());
  app.use(passport.session());

app.get('*', function(req,res,next){
  res.locals.employer=req.user||null;
  next();
});
/*
app.get('*', function(req,res,next){
  res.locals.freelancer=req.user||null;
  next();
});
*/
//home page route
app.get('/', function(req, res){

  res.render('index', {
    title: 'Welcome to done',

  });
});
//post Search
app.post('/',function(req,res){
  const searchvalue=req.body.searchtext;
  console.log(searchvalue);
  let query=({ "$or": [
    {name: {$regex: searchvalue, $options:'i'}},
    {username: {$regex: searchvalue, $options:'i'}},
    {email: {$regex: searchvalue, $options:'i'}},
    {location: {$regex: searchvalue, $options:'i'}},
    {specializaton: {$regex: searchvalue, $options:'i'}}


]})


  console.log(query);
  Freelancer.find(query).exec(function(err, fls){
    if(err){
      console.log(err);
    }else{
      console.log(JSON.stringify(fls));
    res.render('view_freelancers',{
      title: 'Your search returned the following freelancers',
      fls:fls

    })}
  });
});


//Router files

let jobs=require('./routes/jobs');

let employers=require('./routes/employers');
let freelancers=require('./routes/freelancers');
app.use('/jobs', jobs);
app.use('/employers', employers);
app.use('/freelancers',freelancers);

app.listen(3000, function(){
  console.log('Server started on port 3000');
});
