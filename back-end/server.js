require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const router = require("./routes");
const errorsHandlerWrapper = require("./utils/errorsHandlers.util");
const { NotFoundError } = require("./errors");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use("/api", router);

app.all("*", (req, res, next) => {
  next(new NotFoundError(`${req.originalUrl} does not exist on this server.`));
});

app.use(errorsHandlerWrapper);

app.listen(process.env.PORT, () => {
  console.log(`Server is online on the following port: ${process.env.PORT}`);
  console.log(
    `The server can be accessed at ${process.env.HOST}:${process.env.PORT}`
  );
});
