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

app.post('/farmer/mydetails', urlencodedParser, function (req, res) {
    con.connect(function(err){
        console.log("Connected to database");
        console.log(req.body.username);
        con.query(`select F.firstName,F.lastName,F.aadhaarF,F.gender,DATE_FORMAT(F.DoB,"%d %M %Y") as DoB,F.doorNo,F.locality,F.pincode,P.city ,ph.phoneNo from farmer F,pincode P ,phonebook ph where F.farmerEmail="${req.body.username}" and F.pincode=P.pincode and ph.aadhaar=F.aadhaarF;`,function(err,results){
             console.log(results);
             res.send({details: results});
    
        });
    });
});

app.post('/farmer/myaccount', urlencodedParser, function (req, res) {
    con.connect(function(err){
        console.log("Connected to database ");
        con.query(`select email,password,role from login where email="${req.body.username}";`,function(err,results){
              //console.log(results[0]);
               res.send({details: results});
        });
    });
});



app.post('/farmer/mysociety', urlencodedParser, function (req, res) {
    con.connect(function(err){
        console.log("Connected to database ");
        con.query(`select F.aadhaarS,S.societyEmail,S.basecmrate,S.basebmrate,S.doorNo,S.locality,S.pincode,P.city,B.phoneNo from farmer F,society S,pincode P,phonebook B where F.farmerEmail="${req.body.username}" and F.aadhaarS=S.aadhaarS and S.pincode=P.pincode and S.aadhaarS=B.aadhaar;`,function(err,results){
              //console.log(results[0]);
               res.send({details: results});
        });
    });
});
//fetch transaction details
app.post('/farmer/fetchfarmer', urlencodedParser, function (req, res) {
    console.log(req.body.username);
    console.log(req.body.mailS);
    console.log(req.body.fromdate);
    console.log(req.body.todate);
    con.connect(function(err){
        


            con.query(`select t.transacId,DATE_FORMAT(t.date,"%d %M %Y") as date,t.time,f.farmerEmail,s.societyEmail,r.cowMilk,r.CMFatPercent,r.basecmrate,(r.cowMilk*r.CMFatPercent*r.basecmrate)/100 as amount1,r.buffaloMilk,r.BMFatPercent,r.basebmrate,(r.buffaloMilk*r.BMFatPercent*r.basebmrate)/100 as amount2 ,(r.buffaloMilk*r.BMFatPercent*r.basebmrate + r.cowMilk*r.CMFatPercent*r.basecmrate)/100 as total from rate r,testphase t,farmer f,society s where t.transacId=r.transacId and t.aadhaar1=f.aadhaarF and f.aadhaarS=s.aadhaarS and f.farmerEmail="${req.body.username}" and date>="${req.body.fromdate}" and date<="${req.body.todate}";`,function(err,results){
                console.log(results);
                if(results.length==0){
                    res.send({details : "False3"});
                }
                else{
                    res.send({details: results});
                }
            });



    });
});


app.post('/farmer/changepass', urlencodedParser, function (req, res) {
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
