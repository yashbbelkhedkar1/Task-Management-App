const express = require('express');
var userRouter = express.Router();

userRouter.get('/',(req,res)=>{
  res.send("No page found")
})

module.exports = userRouter
