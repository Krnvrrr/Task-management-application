// connnecting express with our database usign mongoose

const mongoose = require('mongoose')

const mongoURI = 'mongodb+srv://tasker:task@321@cluster0.j9lfbj6.mongodb.net/task';

const connectToMongo=()=>{
    mongoose.connect(mongoURI)
    const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error: "));
  db.once("open", function () {
    console.log("Connected to db successfully");
  });
}

module.exports = connectToMongo;