const express = require("express");
const path = require('path')
const parser = require("body-parser");
const db = require("./db/db");
const {
  User,
  ActiveDish,
  Order,
  InactiveDish,
  Review
} = require("./db/Schema")

const app = express();
app.use(parser.json());
app.use(require('./routers/router.dish'));

app.use(parser.urlencoded({ extended: true }));

app.listen(3000, console.log("Listening on 3000"));

module.exports = app;