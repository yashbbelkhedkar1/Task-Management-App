const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose =require('mongoose')
const passport = require('passport')


const tasksRoutes = require('./routes/tasks')
const defaultRoutes = require('./routes/default')
const userRoutes = require('./routes/users')

const app = express()

const url = 'mongodb://0.0.0.0:27072/data1'

mongoose.connect(url,(err) => {
    if(!err)
        console.log("MongoDB connection successfully");
    else
        console.log("Error " , err)
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use('/default',defaultRoutes);
app.use('/api',tasksRoutes);
app.use('/userapi',userRoutes);

app.use('*',(req, res) =>{
  res.redirect('/default');
});

// error handler
app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
      var valErrors = [];
      Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
      res.status(422).send(valErrors)
  }
});

app.listen(3000, () => {
  console.log("Server started at port : 3000")
});



