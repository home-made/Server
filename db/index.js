const objection = require('objection');
const Model = objection.Model;
const Knex = require('knex');
require('dotenv').config();
require('dotenv').load();

console.log(process.env.DATABASE_URL)
const knex = Knex({
  client: "pg",
  useNullAsDefault: true,
  connection: process.env.DATABASE_URL
});

Model.knex(knex);
