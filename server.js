let express = require('express');
let parser = require('body-parser');

let app = express();
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

app.listen(3000, console.log("Listening on 3000"));