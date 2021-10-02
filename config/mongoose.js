const mongoose = require("mongoose");
const express = require("express");
require("dotenv").config();

const app = express();

mongoose
  .connect(process.env.TEST_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(async (_) => {
    console.log("Connected To MONGODB Successfully :)");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = {
  db: mongoose,
  app,
};
