const express = require('express');
var mongoose = require('mongoose');
const user = require('../models/user');
const User = require('../models/user');
var userRouter = express.Router();
const jwt = require('jsonwebtoken');
const jwtTokenHelper = require('../config/jwtTokenHelper')
const _ = require('lodash');


userRouter.get('/',(req,res)=>{
  res.send("from api server")
})

userRouter.post('/register',(req,res,next)=>{
  const user = new User();
  user.email = req.body.email;
  user.password =req.body.password;
  user.role = req.body.role;
  user.name = req.body.name;
  console.log(user.name);
  user.save((error,registeredUser)=>{
    if(!error)
    {
      let payload = {subject : registeredUser._id};
      let token = jwt.sign(payload,'secretKey');
      res.status(200).send({token});

    }
    else {
      if(error.code === 11000)
      {
        console.log(error);
        res.status(422).send("Duplicate email found")
      }
      else {
        return next(err);
      }
    }
  });
});

userRouter.post('/login',(req,res)=>{
  const userData = new User();
  userData.email = req.body.email;
  userData.password =req.body.password;

  User.findOne({email:userData.email}, (error,user)=>{
    if(error){
      console.log("error", error)
    }else{
      if(!user){
          res.status(401).send('Invalid Email')
      }else if(!user.verifyPassword(userData.password)){
        res.status(200).send('Invalid Password')
      }else{
        let payload = {subject : user._id}

        let token = jwt.sign(payload,'secretKey',
        {
          expiresIn : "2m"
        }
        );
        res.status(200).send({token})
      }
    }
  })

});

/*
add token
*/
userRouter.get('/userprofile/:id',(req, res, next) =>{
  console.log(req.params);
  User.findOne({_id : req.params.id},(err, user)=>{

      if(!user){
          return res.status(404).json({ message :err});
      }else{
          return res.status(200).json({user:_.pick(user,['email','name','role'])});
          //return res.json(user)
      }
  })
})


module.exports = userRouter
