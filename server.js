const express = require("express");
const parser = require("body-parser");
const db = require("./db/db")
const { User, ActiveDish, Order, InactiveDish, Review } = require("./db/Schema")
// const k = require("./knexfile");
// const Knex = require("knex");
// const Model = require("objection").Model;

// const knex = Knex(k);
// Model.knex(knex);

const app = express();
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

app.listen(3000, console.log("Listening on 3000"));
