const mongoose = require("mongoose");
const mongoCS = "mongodb+srv://taliaPulsifer:vMChD0J3lpFAEtog@library.yiy5hwm.mongodb.net/"

const dbName = "library";

mongoose.connect(mongoCS + dbName)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

const connection = mongoose.connection;
connection.on("error", console.error.bind(console, "MongoDB connection error:"));
connection.once("open", function() { console.log("connected"); });

module.exports = connection;




