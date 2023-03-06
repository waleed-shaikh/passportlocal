const mongoose = require("mongoose");

// mongoose.connect('');
mongoose.connect(process.env.MONGO_URI);

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("Mongo Db Connection Successful");
});

connection.on("error", (err) => {
  console.log("Mongo Db Connection Failed");
});

module.exports = connection;
