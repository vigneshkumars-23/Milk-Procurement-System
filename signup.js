var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "password",
    database: "mydb"
  });

var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.static("public"));




var server = app.listen(8081, function () {})
