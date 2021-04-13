const express = require("express");
const app = express();
const indexRoute = require("./routes/index");
const path = require("path");
const cors = require("cors");
const db = require("./models/database");

db.initialize();
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/api", indexRoute);

module.exports = app;
