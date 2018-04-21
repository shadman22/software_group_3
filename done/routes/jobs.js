const express=require('express');
const router=express.Router();

let Job=require('../models/job');
let Employer=require('../models/employer');
//add job route
router.get('/add', ensureAuthenticated, function(req, res){

  res.render('add_job', {
    title: 'Add new job',

  });
});





//View job
router.get('/view', function(req, res){
  Job.find({},function(err,jobs){
    if(err){
      console.log(err);
    }
    else{
    res.render('view_job',{
      title: 'New jobs',
      jobs: jobs
    });}
  });

});

// posting job
router.post('/add', function(req,res){
  req.checkBody('title', 'Job title is required').notEmpty();
  //  req.checkBody('postedby', 'Posted by is required').notEmpty();
      req.checkBody('body', 'Job description is required').notEmpty();
        req.checkBody('amount', 'Job payment detail is required').notEmpty();


  //getting errors
  let errors=req.validationErrors();
  if(errors){
    res.render('add_job',{
      title:'Add Articles',
      errors:errors});

  }else{
    let job=new Job();
    job.title=req.body.title;
    job.postedby=req.user._id;
    job.body=req.body.body;
    job.amount=req.body.amount;
    job.save(function(err){
      if(err){
        console.log(err);
        return
      }
      else{
        req.flash('success', 'New job added!');
        res.redirect('/jobs/view');
      }

    });
  }



});

//get single item

router.get('/:id',function(req,res){
  Job.findById(req.params.id, function(err, job){
    Employer.findById(job.postedby,function(err,user){

      res.render('jobs', {
        job: job,
        postedby: user.name
      });
    });
  });
});

//edit single item

router.get('/edit/:id', ensureAuthenticated, function(req,res){
  Job.findById(req.params.id, function(err, job){
    if(job.postedby != req.user.id){
      req.flash('danger', 'Not Authorized');
      res.redirect('/');
    }

    res.render('edit_job', {
      title:'Edit Job Details',
      job: job

    });
  });
});

// save after edit job
router.post('/edit/:id', function(req,res){
  let job={};
  job.title=req.body.title;
  job.postedby=req.user._id;
  job.body=req.body.body;
  job.amount=req.body.amount;

  let query = {_id: req.params.id}

  Job.update(query, job,function(err){
    if(err){
      console.log(err);
      return
    }
    else{
      req.flash('success', 'Job details updated');
      res.redirect('/jobs/view');
    }

  });
});

router.delete('/:id', function(req, res){
  if(!req.user._id){
    res.status(500).send();
  }
  let query={_id:req.params.id}
  Job.findById(req.params.id, function(err, job){
    if(job.postedby!=req.user._id){
      res.status(500).send();
    }
    else{
      Job.remove(query,function(err){
        if(err){
          console.log(err);
        }
        res.send('Success');
      });
    }
  });


});

//Access control
function ensureAuthenticated(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  else{
    req.flash('danger', 'Please login first');
    res.redirect('/employers/login');
  }
}



module.exports=router;
