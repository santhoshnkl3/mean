const express = require("express");
const mongoose = require("mongoose");

const bodyParser = require("body-parser");
const student = require("./models/student");
const studentRoute = require("./routes/student");
const app = express();

mongoose
  .connect(
    "mongodb+srv://santhoshsk:l9ItB3ZeEPb1dmIt@cluster0-qec8k.mongodb.net/node-angular?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connnected to database sucessfully");
  })
  .catch(() => {
    console.log("Database connection failed");
  });
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PATCH,DELETE,OPTIONS,PUT"
  );
  next();
});

app.use("/api/student", studentRoute);

module.exports = app;
