require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const router = require("./routes");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");

const errorsHandlerWrapper = require("./utils/errorsHandlers.util");
const { NotFoundError } = require("./errors");

app.use(helmet());

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again later.",
});

app.use("/api", limiter);

app.use(bodyParser.json({ limit: "10kb" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(xss());

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
