var express = require('express');
var taskRouter = express.Router();
var mongoose = require('mongoose');
const task = require('../models/task');
var Task = require('../models/task');
const jwtTokenHelper = require('../config/jwtTokenHelper')

/*
add token
*/

taskRouter.get('/tasks',jwtTokenHelper.verifyToken,(req,res,next)=>{
  console.log("get request")
  Task.find({})
    .exec((error,tasks)=>{
      if(error){
        res.send("error while retriving");
      }else {
        console.log(tasks)
        res.json(tasks);
      }
    })
});

taskRouter.post('/task',(req,res,next) => {
  const newTask = new Task();
  newTask.taskName = req.body.taskName;
  newTask.taskDescription = req.body.taskDescription;
  newTask.taskStatus = req.body.taskStatus;
  newTask.archEmail = req.body.archEmail;
  newTask.buildEmail = req.body.buildEmail;

  newTask.save((error,insertedTask)=>{
    if(error)
    {
      res.send("error");
    }
    else{
      res.json(insertedTask);
    }
  });
})

taskRouter.delete('/task/:id', function(req, res, next){
    console.log('Delete');
    Task.findByIdAndRemove(req.params.id, function(err, deletedTask){
        if(err){
            res.send("Error ");
        }else{
            res.json(deletedTask);
        }
    })
})

taskRouter.put('/task/:id', function(req, res, next){
  console.log('Update ');
  Task.findByIdAndUpdate(req.params.id,
  {
      $set: {
        taskName: req.body.taskName,
        taskStatus: req.body.taskStatus,
        taskDescription: req.body.taskDescription,
        archEmail : req.body.archEmail,
        buildEmail : req.body.buildEmail
      }
  },
  {
      new: true
  },
  function(err, updatedTask){
      if(err){
          res.send("Error ");
      }else{
          res.json(updatedTask);
      }
  }
  )
})

taskRouter.get('/task/:id',jwtTokenHelper.verifyToken, function(req, res, next){
  console.log('Get request ');
  Task.findById(req.params.id)
  .exec(function(err, tasks){
      if(err){
          res.send("Error retrieving");
      }else{
          res.json(tasks);
      }
  })
})


//find by builder's email
taskRouter.get('/buildtasks/:builderemail',jwtTokenHelper.verifyToken,(req,res,next)=>{
  console.log("get request")
  Task.find({buildEmail : req.params.builderemail})
    .exec((error,tasks)=>{
      if(error){
        res.send("error while retriving");
      }else {

        res.json(tasks);
      }
    })
});

//find by architech's email
taskRouter.get('/archtasks/:archemail',jwtTokenHelper.verifyToken,(req,res,next)=>{
  console.log("get request")
  Task.find({archEmail : req.params.archemail})
    .exec((error,tasks)=>{
      if(error){
        res.send("error while retriving");
      }else {

        res.json(tasks);
      }
    })
});


module.exports = taskRouter;
