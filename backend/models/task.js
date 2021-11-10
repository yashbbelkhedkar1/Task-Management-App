const mongoose =require('mongoose');

const taskSchema = mongoose.Schema({
  taskName : {type : String},
  taskStatus : {type : String},
  taskDescription: {type : String},
  archEmail : {type : String},
  buildEmail : {type : String}
});

module.exports = mongoose.model('Task',taskSchema);

