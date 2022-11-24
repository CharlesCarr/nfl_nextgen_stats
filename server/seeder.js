const fs = require("fs");
require("dotenv").config();

const connectDB = require("./config/db");
const Passer = require("./models/Passer");

// Connect to DB
connectDB();

const passers = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/passing.json`, "utf-8")
);

// import to DB
const importData = async () => {
  try {
    await Passer.create(passers);
    console.log("Data Imported");
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

importData();
