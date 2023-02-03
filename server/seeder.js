const fs = require("fs");
require("dotenv").config();

const connectDB = require("./config/db");
// const Passer = require("./models/Passer");
// const Rusher = require("./models/Rusher");
// const Receiver = require("./models/Receiver");

// Connect to DB
connectDB();

// Passing Data
// const passers = JSON.parse(
//   fs.readFileSync(`${__dirname}/_data/passing.json`, "utf-8")
// );

// Rushing Data
// const rushers = JSON.parse(
//   fs.readFileSync(`${__dirname}/_data/rushing.json`, "utf-8")
// );

// Receiving Data
// const receivers = JSON.parse(
//   fs.readFileSync(`${__dirname}/_data/receiving.json`, "utf-8")
// );


// import data to DB
const importData = async () => {
  try {
    // flip the model and data input depending on which set you are trying to update
    // await Passer.create(passers);
    // console.log("Passer Data Imported");
    // await Rusher.create(rushers);
    // console.log("Rusher Data Imported");
    // await Receiver.create(receivers);
    // console.log("Receiver Data Imported");
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// importData();
