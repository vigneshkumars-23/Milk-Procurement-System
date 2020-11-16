let express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
let app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json());

var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "password",
  database: "mydb",
  port: '3306'
});

app.post('/industry/change-pass', urlencodedParser, function (req, res) {
    con.connect(function(err){
        console.log("connected to database");
        con.query(`select * from chillingsystem where chillingEmail="${req.body.username}";`,function(err,results){
            // console.log(result[0]);
               res.send({details: results});
        });
    });
});

app.post('/industry/get-personal', urlencodedParser, function (req, res) {
    con.connect(function(err){
        console.log("connected to database");
        con.query(`select * from industry where industryEmail="${req.body.username}";`,function(err,results){
            // console.log(result[0]);
               res.send({details: results});
        });
    });
});

app.post('/industry/chilling', urlencodedParser, function (req, res) {
    con.connect(function(err){
        console.log("connected to database ");
        con.query(`select * from chillingsystem where aadhaarI=(select aadhaarI from industry where industryEmail="${req.body.username}");`,function(err,results){
            //  console.log(results[0]);
               res.send({details: results});
        });
    });
});

app.post('/enterdata', urlencodedParser, function (req, res) {

    con.connect(function(err){
        
        console.log(req.body);
        con.query(`insert into testphase values (${req.body.transacid},'${req.body.date}','${req.body.time}',${req.body.caadhaar},(select aadhaarIndustry from  where industryEmail="${req.body.username}"));`,function(err,results){});
        con.query(`insert into rate values (${req.body.transacid},${req.body.cowmilk},${req.body.buffalomilk},${req.body.cowmilkfatpercent},${req.body.buffalomilkfatpercent});`,function(err,results){});
        res.send("Successfully inserted");

    });

});


app.post('/industry/chillingtransac', urlencodedParser, function (req, res) {
    con.connect(function(err){


        if(req.body.fdate=="" && req.body.tdate==""){
            if(req.body.aadhaar==""){
                con.query(`select t.*,r.* from rate r,testphase t where t.transacId=r.transacId and t.aadhaar2=(select aadhaarI from industry where industryEmail="${req.body.username}");`,function(err,results){
                    console.log(results);
                    res.send({details: results});
                });
            }
            else{
                con.query(`select t.*,r.* from rate r,testphase t where t.aadhaar2=(select aadhaarI from industry where industryEmail="${req.body.username}") and t.aadhaar1="${req.body.aadhaar}" and r.transacId=t.transacId;`,function(err,results){
                    console.log(results);
                    res.send({details: results});
                });
            }
        }
        //else if(req.body.fdate=="" || req.body.tdate==""){res.send();}
        else{
            if(req.body.aadhaar==""){
                con.query(`select t.*,r.* from rate r,testphase t where t.aadhaar2=(select aadhaarI from industry where industryEmail="${req.body.username}") and date>="${req.body.fdate}" and date<="${req.body.tdate}" and r.transacId=t.transacId;`,function(err,results){
                    console.log(results);
                    res.send({details: results});
                });
            }
            else{
                con.query(`select t.*,r.* from rate r,testphase t where t.aadhaar2=(select aadhaarI from industry where industryEmail="${req.body.username}") and date>="${req.body.fdate}" and date<="${req.body.tdate}" and t.aadhaar1="${req.body.aadhaar}" and r.transacId=t.transacId;`,function(err,results){
                    console.log(results);
                    res.send({details: results});
                });
            }
        }

    });
});


var server = app.listen(8081, function () {});