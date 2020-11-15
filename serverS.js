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
        con.query(`select F.firstName,F.lastName,F.aadhaarF,F.gender,F.DoB,F.doorNo,F.locality,F.pincode,P.city from farmer F,pincode P where F.farmerEmail="${req.body.username}" and F.pincode=P.pincode;");`,function(err,results){
             console.log(results);
               res.send({details: results});
        });
    });
});

app.post('/change-pass', urlencodedParser, function (req, res) {
    con.connect(function(err){
        con.query(`select * from login where email='${req.body.username}' and password='${req.body.oldpass}' and role='society'; `,function(err,results){
            
            if(results.length==0){
                res.send("Old password incorrect");
            }
            else{
                con.query(`update login set password='${req.body.newpass}' where email='${req.body.username}' and role="society";`,function(err,results){});
                res.send("Successfully changed");
            }

        });
    });
});


app.post('/enterdata', urlencodedParser, function (req, res) {

    con.connect(function(err){
        
        console.log(req.body);
        con.query(`insert into testphase values (${req.body.transacid},'${req.body.date}','${req.body.time}',${req.body.faadhaar},(select aadhaarS from society where societyEmail="${req.body.username}"));`,function(err,results){});
        con.query(`insert into rate values (${req.body.transacid},${req.body.cowmilk},${req.body.buffalomilk},${req.body.cowmilkfatpercent},${req.body.buffalomilkfatpercent});`,function(err,results){});
        res.send("successfully inserted");

    });

});

app.post('/ownrecords', urlencodedParser, function (req, res) {

    con.connect(function(err){
        
        con.query(`select t.*,r.* from rate r,testphase t where t.aadhaar1=(select aadhaarS from society where societyEmail="${req.body.username}") and date>="${req.body.fdate}" and date<="${req.body.tdate}" and r.transacId=t.transacId;`,function(err,results){
            res.send({details: results});
        });

    });

});



app.post('/farmertransac', urlencodedParser, function (req, res) {
    con.connect(function(err){


        if(req.body.fdate=="" && req.body.tdate==""){
            if(req.body.aadhaar==""){
                con.query(`select t.*,r.* from rate r,testphase t where t.transacId=r.transacId and t.aadhaar2=(select aadhaarS from society where societyEmail="${req.body.username}");`,function(err,results){
                    console.log(results);
                    res.send({details: results});
                });
            }
            else{
                con.query(`select t.*,r.* from rate r,testphase t where t.aadhaar2=(select aadhaarS from society where societyEmail="${req.body.username}") and t.aadhaar1="${req.body.aadhaar}" and r.transacId=t.transacId;`,function(err,results){
                    console.log(results);
                    res.send({details: results});
                });
            }
        }
        //else if(req.body.fdate=="" || req.body.tdate==""){res.send();}
        else{
            if(req.body.aadhaar==""){
                con.query(`select t.*,r.* from rate r,testphase t where t.aadhaar2=(select aadhaarS from society where societyEmail="${req.body.username}") and date>="${req.body.fdate}" and date<="${req.body.tdate}" and r.transacId=t.transacId;`,function(err,results){
                    console.log(results);
                    res.send({details: results});
                });
            }
            else{
                con.query(`select t.*,r.* from rate r,testphase t where t.aadhaar1=(select aadhaarS from society where societyEmail="${req.body.username}") and date>="${req.body.fdate}" and date<="${req.body.tdate}" and t.aadhaar1="${req.body.aadhaar}" and r.transacId=t.transacId;`,function(err,results){
                    console.log(results);
                    res.send({details: results});
                });
            }
        }

    });
});





var server = app.listen(8081, function () {});
