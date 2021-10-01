const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();


mongoose.connect(process.env.TEST_URI, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
}).then(async _ => {
    console.log("Connected To MONGODB Successfully :)");
}).catch(err => {
    console.log(err)
});

module.exports = {
    app,
    db: mongoose
}