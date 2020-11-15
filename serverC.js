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

app.post('/chilling', urlencodedParser, function (req, res) {
    con.connect(function(err){
        console.log("connected to database");
        con.query(`select * from chillingsystem where chillingEmail="${req.body.username}";`,function(err,results){
            // console.log(result[0]);
               res.send({details: results});
        });
    });
});

app.post('/society', urlencodedParser, function (req, res) {
    con.connect(function(err){
        console.log("connected to database ");
        con.query(`select * from society where aadhaarC=(select aadhaarC from chillingsystem where chillingEmail="${req.body.username}");`,function(err,results){
            //  console.log(results[0]);
               res.send({details: results});
        });
    });
});

app.post('/change-pass', urlencodedParser, function (req, res) {
    con.connect(function(err){
        con.query(`select * from login where email='${req.body.username}' and password='${req.body.oldpass}' and role='chillingsystem'; `,function(err,results){
            
            if(results.length==0){
                res.send("Old password incorrect");
            }
            else{
                con.query(`update login set password='${req.body.newpass}' where email='${req.body.username}' and role="chillingsystem";`,function(err,results){});
                res.send("Successfully changed");
            }

        });
    });
});


app.post('/enterdata', urlencodedParser, function (req, res) {

    con.connect(function(err){
        
        console.log(req.body);
        con.query(`insert into testphase values (${req.body.transacid},'${req.body.date}','${req.body.time}',${req.body.saadhaar},(select aadhaarC from chillingsystem where chillingEmail="${req.body.username}"));`,function(err,results){});
        con.query(`insert into rate values (${req.body.transacid},${req.body.cowmilk},${req.body.buffalomilk},${req.body.cowmilkfatpercent},${req.body.buffalomilkfatpercent});`,function(err,results){});
        res.send("Successfully inserted");

    });

});

app.post('/ownrecords', urlencodedParser, function (req, res) {

    con.connect(function(err){
        
        con.query(`select t.*,r.* from rate r,testphase t where t.aadhaar1=(select aadhaarC from chillingsystem where chillingEmail="${req.body.username}") and date>="${req.body.fdate}" and date<="${req.body.tdate}" and r.transacId=t.transacId;`,function(err,results){
            res.send({details: results});
        });

    });

});



app.post('/societytransac', urlencodedParser, function (req, res) {
    con.connect(function(err){


        if(req.body.fdate=="" && req.body.tdate==""){
            if(req.body.aadhaar==""){
                con.query(`select t.*,r.* from rate r,testphase t where t.transacId=r.transacId and t.aadhaar2=(select aadhaarC from chillingsystem where chillingEmail="${req.body.username}");`,function(err,results){
                    console.log(results);
                    res.send({details: results});
                });
            }
            else{
                con.query(`select t.*,r.* from rate r,testphase t where t.aadhaar2=(select aadhaarC from chillingsystem where chillingEmail="${req.body.username}") and t.aadhaar1="${req.body.aadhaar}" and r.transacId=t.transacId;`,function(err,results){
                    console.log(results);
                    res.send({details: results});
                });
            }
        }
        //else if(req.body.fdate=="" || req.body.tdate==""){res.send();}
        else{
            if(req.body.aadhaar==""){
                con.query(`select t.*,r.* from rate r,testphase t where t.aadhaar2=(select aadhaarC from chillingsystem where chillingEmail="${req.body.username}") and date>="${req.body.fdate}" and date<="${req.body.tdate}" and r.transacId=t.transacId;`,function(err,results){
                    console.log(results);
                    res.send({details: results});
                });
            }
            else{
                con.query(`select t.*,r.* from rate r,testphase t where t.aadhaar2=(select aadhaarC from chillingsystem where chillingEmail="${req.body.username}") and date>="${req.body.fdate}" and date<="${req.body.tdate}" and t.aadhaar1="${req.body.aadhaar}" and r.transacId=t.transacId;`,function(err,results){
                    console.log(results);
                    res.send({details: results});
                });
            }
        }

    });
});





var server = app.listen(8081, function () {});
