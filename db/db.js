require("dotenv").load();
const mongoose = require('mongoose')
var login = process.env.DATABASE_URL
console.log(login)
mongoose.connect(login);

var db = mongoose.connection

db.on('error',console.error.bind(console, 'connection error:'));
db.once('open', () =>{
    console.log('mongo connected big fella')
})

module.exports = db;