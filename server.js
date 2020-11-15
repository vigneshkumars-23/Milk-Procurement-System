let express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
let app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.static("public"));
app.use(bodyParser.json());

var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "password",
  database: "mydb",
  port: '3306'
});

app.post('/society', urlencodedParser, function (req, res) {
    con.connect(function(err){
        console.log("connected to database");
        con.query(`select * from society where societyEmail="${req.body.username}";`,function(err,results){
            // console.log(result[0]);
               res.send({details: results});
        });
    });
});

app.post('/farmer', urlencodedParser, function (req, res) {
    con.connect(function(err){
        console.log("connected to database ");
        con.query(`select * from farmer where aadhaarS=(select aadhaarS from society where societyEmail="${req.body.username}");`,function(err,results){
            //  console.log(results[0]);
               res.send({details: results});
        });
    });
});



var server = app.listen(8081, function () {});
