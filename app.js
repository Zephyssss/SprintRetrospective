const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const routes = require("./routes/index.js");
const AppError = require("./utils/appError.js");
const handlerError = require("./controllers/error.controller.js");

const app = express();

// Allow Cross-Origin requests
app.use(cors());

// Limit request from the same API
/*TODO*/

// Body parser, reading data from body into req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/v1", routes);

// handle undefined Routes
app.use("*", (req, res, next) => {
  const err = new AppError(404, "fail", "undefined route");
  next(err, req, res, next);
});

app.use(handlerError);

module.exports = app;
