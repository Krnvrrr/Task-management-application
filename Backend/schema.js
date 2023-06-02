const mongoose =require('mongoose');
const { Schema } = mongoose;
const task = new Schema({
  Title: { type: String, require: true },
  discription: { type: String, require: true },
  status: { type: String, default:'panding'},
  date: { type: String, default: Date.now },
});
module.exports = mongoose.model("task", task);
