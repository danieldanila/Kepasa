require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const router = require("./routes");
const cors = require("cors");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use("/api", router);

app.listen(process.env.PORT, () => {
  console.log(`Server is online on the following port: ${process.env.PORT}`);
  console.log(
    `The server can be accessed at ${process.env.HOST}:${process.env.PORT}`
  );
});
