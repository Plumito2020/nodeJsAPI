const express = require("express");
const bodyParser = require("body-parser");
const productRouter = require("./routes/product");
const mongoose = require("mongoose");

const app = express();

// Parsing the incoming requests
app.use(bodyParser.json());

// To avoid CORS errors
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Setting up the middlewares
app.use("/", productRouter);

mongoose
  .connect(
    "mongodb+srv://zakaria:zakaria@cluster0.0al6x.mongodb.net/test?retryWrites=true&w=majority"
  )
  .then((res) => app.listen(8080))
  .catch((err) => console.log("[ERROR MONGO]", err));
// Exposing the port 8080
