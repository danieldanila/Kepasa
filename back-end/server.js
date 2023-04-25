require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is online on the following port: ${process.env.PORT}`);
  console.log(
    `The server can be accessed at ${process.env.HOST}:${process.env.PORT}`
  );
});
