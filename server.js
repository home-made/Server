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

app.listen(3000, console.log("Listening on 3000"));
