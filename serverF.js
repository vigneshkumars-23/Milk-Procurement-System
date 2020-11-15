let express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
let app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.static(__dirname));
app.use(bodyParser.json());

var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "password",
  database: "mydb",
  port: '3306'
});

app.post('/mydetails', urlencodedParser, function (req, res) {
    con.connect(function(err){
        console.log("Connected to database");
        console.log(req.body.username);
        con.query(`select F.firstName,F.lastName,F.aadhaarF,F.gender,F.DoB,F.doorNo,F.locality,F.pincode,P.city from farmer F,pincode P where F.farmerEmail="${req.body.username}" and F.pincode=P.pincode;`,function(err,results){
             console.log(results);
             res.send({details: results});
    
        });
    });
});

app.post('/myaccount', urlencodedParser, function (req, res) {
    con.connect(function(err){
        console.log("Connected to database ");
        con.query(`select email,password,role from login where email="${req.body.username}";`,function(err,results){
              //console.log(results[0]);
               res.send({details: results});
        });
    });
});

app.post('/mycontact', urlencodedParser, function (req, res) {
    con.connect(function(err){
        console.log("Connected to database ");
        con.query(`select F.farmerEmail,P.phoneNo from farmer F,phonebook P where F.farmerEmail="${req.body.username}" and F.aadhaarF=P.aadhaar;`,function(err,results){
              //console.log(results[0]);
               res.send({details: results});
        });
    });
});

app.post('/mysociety', urlencodedParser, function (req, res) {
    con.connect(function(err){
        console.log("Connected to database ");
        con.query(`select F.aadhaarS,S.societyEmail,S.basecmrate,S.basebmrate,S.doorNo,S.locality,S.pincode,P.city,B.phoneNo from farmer F,society S,pincode P,phonebook B where F.farmerEmail="${req.body.username}" and F.aadhaarS=S.aadhaarS and S.pincode=P.pincode and S.aadhaarS=B.aadhaar;`,function(err,results){
              //console.log(results[0]);
               res.send({details: results});
        });
    });
});
//fetch transaction details
app.post('/fetchfarmer', urlencodedParser, function (req, res) {
    console.log(req.body.username);
    console.log(req.body.mailS);
    console.log(req.body.fromdate);
    console.log(req.body.todate);
    con.connect(function(err){
        
        if(req.body.fromdate=="" && req.body.todate==""){
            if(req.body.mailS==""){
                con.query(`select t.*,r.*,f.farmerEmail,s.societyEmail,s.basecmrate,s.basebmrate from rate r,testphase t,farmer f,society s where t.transacId=r.transacId and t.aadhaar1=f.aadhaarF and f.aadhaarS=s.aadhaarS and f.farmerEmail="${req.body.username}";`,function(err,results){
                    console.log(results);
                    res.send({details: results});
                });
            }
            else{
                con.query(`select t.*,r.*,f.farmerEmail,s.societyEmail,s.basecmrate,s.basebmrate from rate r,testphase t,farmer f,society s where t.transacId=r.transacId and t.aadhaar1=f.aadhaarF and f.aadhaarS=s.aadhaarS and f.farmerEmail="${req.body.username}" and s.societyEmail="${req.body.mailS}";`,function(err,results){
                    console.log(results);
                    if(results.length==0){
                        res.send({details : "False1"});
                    }
                    else{
                        res.send({details: results});
                    }
                });
            }
        }
        //else if(req.body.fdate=="" || req.body.tdate==""){res.send();}
        else{
            if(req.body.mailS==""){
                con.query(`select t.*,r.*,f.farmerEmail,s.societyEmail,s.basecmrate,s.basebmrate from rate r,testphase t,farmer f,society s where t.transacId=r.transacId and t.aadhaar1=f.aadhaarF and f.aadhaarS=s.aadhaarS and f.farmerEmail="${req.body.username}" and date>="${req.body.fromdate}" and date<="${req.body.todate}";`,function(err,results){
                    console.log(results);
                    if(results.length==0){
                        res.send({details : "False2"});
                    }
                    else{
                        res.send({details: results});
                    }
                });
            }
            else{
                con.query(`select t.*,r.*,f.farmerEmail,s.societyEmail,s.basecmrate,s.basebmrate from rate r,testphase t,farmer f,society s where t.transacId=r.transacId and t.aadhaar1=f.aadhaarF and f.aadhaarS=s.aadhaarS and f.farmerEmail="${req.body.username}" and date>="${req.body.fromdate}" and date<="${req.body.todate}" and s.societyEmail="${req.body.mailS}";`,function(err,results){
                    console.log(results);
                    if(results.length==0){
                        res.send({details : "False3"});
                    }
                    else{
                        res.send({details: results});
                    }
                });
            }
        }

    });
});


app.post('/changepass', urlencodedParser, function (req, res) {
    con.connect(function(err){
        con.query(`select * from login where email='${req.body.username}' and password='${req.body.oldpass}' and role='farmer'; `,function(err,results){
            
            if(results.length==0){
                res.send("Old password incorrect");
            }
            else{
                con.query(`update login set password='${req.body.newpass}' where email='${req.body.username}' and role="farmer";`,function(err,results){});
                res.send("Successfully changed your password");
            }

        });
    });
});

var server = app.listen(8081, function () {});
