// connnecting express with our database usign mongoose

const mongoose = require('mongoose')

const mongoURI = 'mongodb://127.0.0.1:27017/tasks';

const connectToMongo=()=>{
    mongoose.connect(mongoURI)
    const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error: "));
  db.once("open", function () {
    console.log("Connected to db successfully");
  });
}

module.exports = connectToMongo;