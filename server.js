require("dotenv").load();
const express = require("express");

const parser = require("body-parser");
const db = require(".mv git log/db/db");
const {
  User,
  ActiveDish,
  Order,
  InactiveDish,
  Review
} = require("./db/Schema");

const app = express();
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.listen(process.env.PORT, console.log(`Listening on ${process.env.PORT}`));
