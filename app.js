const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

require("dotenv").config();

// importing routes
const indexRouter = require("./routes/index");
const activityRouter = require("./routes/activity.route");
const activityTypeRouter = require("./routes/activityType.route");

const app = express();

// middlreware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// db connection
const dbName =
  process.env.NODE_ENV === "test"
    ? process.env.DB_TESTING
    : process.env.NODE_ENV === "production"
    ? process.env.DB_PRODUCTION
    : process.env.DB_DEVELOPMENT;

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_CONNECTION_STRING}/${dbName}?retryWrites=true&w=majority&appName=${process.env.DB_APP_NAME}`
  )
  .then(() => console.log("Connected to the databse"))
  .catch(() => console.log("Error connecting to the database"));

// routes
app.use("/", indexRouter);
app.use("/activities", activityRouter);
app.use("/activity-types", activityTypeRouter);

module.exports = app;
