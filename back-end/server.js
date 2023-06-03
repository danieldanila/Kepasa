require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const router = require("./routes");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");

const errorsHandlerWrapper = require("./utils/errorsHandlers.util");
const { NotFoundError } = require("./errors");
const cookieParser = require("cookie-parser");

app.use(helmet());

const limiter = rateLimit({
  max: 10000,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again later.",
});

app.use("/api", limiter);

app.use(bodyParser.json({ limit: "10kb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(xss());

app.use(
  hpp({
    whitelist: [],
  })
);

app.use((req, res, next) => {
  next();
});

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

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
