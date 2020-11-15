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

app.post('/new_farmer', urlencodedParser, function (req, res) {


        con.connect(function(err){

        con.query(`select * from pincode where pincode=${req.body.Pincode}`,function(err,results){
            if(results.length>0){}
            else{
                con.query(`insert into pincode (pincode,city) values ('${req.body.Pincode}','${req.body.City}');`,function(err,results){});
            }
        });


       con.query(`select * from farmer where aadhaarF=${req.body.Faadhaar}`,function(err,results){

            if(results.length > 0){res.send("The record is already present");}
            else{

                con.query(`select * from society where aadhaarS=${req.body.Saadhaar}`,function(err,results){

                    if(results.length == 0){res.send("The record is not present");}
                    else{
                        con.query(`insert into login (email,password,role) values ('${req.body.email}','${req.body.password}','farmer') `,function(err,results){});
                        con.query(`insert into farmer (aadhaarF,aadhaarS,farmerEmail,firstName,lastName,gender,DoB,doorNo,locality,pincode) values ('${req.body.Faadhaar}','${req.body.Saadhaar}','${req.body.email}','${req.body.Fname}','${req.body.Lname}','${req.body.Gender}','${req.body.dob}','${req.body.DoorNo}','${req.body.Locality}','${req.body.Pincode}')`,function(err,results){});
                        if(req.body.Phoneno1!=""){con.query(`insert into phonebook (aadhaar,phoneNo,role) values ('${req.body.Faadhaar}','${req.body.Phoneno1}','farmer') `,function(err,results){});}
                        if(req.body.Phoneno2!=""){con.query(`insert into phonebook (aadhaar,phoneNo,role) values ('${req.body.Faadhaar}','${req.body.Phoneno2}','farmer') `,function(err,results){});}
                        res.send("successfully inserted");
                    }
                
                });

            }

       });

    });



});

app.post('/new_society', urlencodedParser, function (req, res) {

    con.connect(function(err){


        con.query(`select * from pincode where pincode=${req.body.Pincode}`,function(err,results){
            // console.log("pincode");
            if(results.length>0){}
            else{
                con.query(`insert into pincode (pincode,city) values ('${req.body.Pincode}','${req.body.City}');`,function(err,results){});
            }
        });

        con.query(`select * from society where aadhaarS=${req.body.Saadhaar}`,function(err,results){
            // console.log("society");
            if(results.length > 0){res.send("The record is already present");}
            else{

                    con.query(`select * from chillingsystem where aadhaarC=${req.body.Caadhaar}`,function(err,results){
                        // console.log("chilling");
                        if(results.length == 0){res.send("The record is not present");}
                        else{
                            con.query(`insert into login (email,password,role) values ('${req.body.email}','${req.body.password}','society') `,function(err,results){});
                            con.query(`insert into society (aadhaarS,aadhaarC,societyEmail,basecmrate,basebmrate,doorNo,locality,pincode) values ('${req.body.Saadhaar}','${req.body.Caadhaar}','${req.body.email}','${req.body.baseCMRate}','${req.body.baseBMRate}','${req.body.DoorNo}','${req.body.Locality}','${req.body.Pincode}')`,function(err,results){});
                            if(req.body.Phoneno1!=""){con.query(`insert into phonebook (aadhaar,phoneNo,role) values ('${req.body.Saadhaar}','${req.body.Phoneno1}','society') `,function(err,results){});}
                            if(req.body.Phoneno2!=""){con.query(`insert into phonebook (aadhaar,phoneNo,role) values ('${req.body.Saadhaar}','${req.body.Phoneno2}','society') `,function(err,results){});}
                            res.send("successfully inserted");
                                
                        }

                    });
            }

       });
        
    });

});

app.post('/new_chilling', urlencodedParser, function (req, res) {

    con.connect(function(err){


        con.query(`select * from pincode where pincode=${req.body.Pincode}`,function(err,results){
            // console.log("pincode");
            if(results.length>0){}
            else{
                con.query(`insert into pincode (pincode,city) values ('${req.body.Pincode}','${req.body.City}');`,function(err,results){});
            }
        });

        con.query(`select * from chillingsystem where aadhaarC=${req.body.Caadhaar}`,function(err,results){

            // console.log("chilling");
            if(results.length > 0){res.send("The record is already present");}
            else{

                con.query(`select * from industry where aadhaarI=${req.body.Iaadhaar}`,function(err,results){
                    // console.log("industry");
                    if(results.length == 0){res.send("The record is not present");}
                    else{
                           con.query(`insert into login (email,password,role) values ('${req.body.email}','${req.body.password}','chillingsystem') `,function(err,results){});
                            con.query(`insert into chillingsystem(aadhaarC,aadhaarI,chillingEmail,basecmrate,basebmrate,doorNo,locality,pincode) values ('${req.body.Caadhaar}','${req.body.Iaadhaar}','${req.body.email}','${req.body.baseCMRate}','${req.body.baseBMRate}','${req.body.DoorNo}','${req.body.Locality}','${req.body.Pincode}')`,function(err,results){});
                            if(req.body.Phoneno1!=""){con.query(`insert into phonebook (aadhaar,phoneNo,role) values ('${req.body.Caadhaar}','${req.body.Phoneno1}','chillingsystem') `,function(err,results){});}
                            if(req.body.Phoneno2!=""){con.query(`insert into phonebook (aadhaar,phoneNo,role) values ('${req.body.Caadhaar}','${req.body.Phoneno2}','chillingsystem') `,function(err,results){});}
                            res.send("successfully inserted");
                        }
                
                });
                    
            }

       });
        
    });

});


app.post('/new_industry', urlencodedParser, function (req, res) {

    con.connect(function(err){

        con.query(`select * from pincode where pincode=${req.body.Pincode}`,function(err,results){
            if(results.length>0){}
            else{
                con.query(`insert into pincode (pincode,city) values ('${req.body.Pincode}','${req.body.City}');`,function(err,results){});
            }
        });

        con.query(`select * from industry where aadhaarI=${req.body.Iaadhaar}`,function(err,results){

            if(results.length > 0){res.send("The record is already present");}
            else{
                    con.query(`insert into login (email,password,role) values ('${req.body.email}','${req.body.password}','industry') `,function(err,results){});
                    con.query(`insert into industry (aadhaarI,firstName,lastName,industryEmail,basecmrate,basebmrate,doorNo,locality,pincode) values ('${req.body.Iaadhaar}','${req.body.Fname}','${req.body.Lname}','${req.body.email}','${req.body.baseCMRate}','${req.body.baseBMRate}','${req.body.DoorNo}','${req.body.Locality}','${req.body.Pincode}')`,function(err,results){});
                    if(req.body.Phoneno1!=""){con.query(`insert into phonebook (aadhaar,phoneNo,role) values ('${req.body.Iaadhaar}','${req.body.Phoneno1}','industry') `,function(err,results){});}
                    if(req.body.Phoneno2!=""){con.query(`insert into phonebook (aadhaar,phoneNo,role) values ('${req.body.Iaadhaar}','${req.body.Phoneno2}','industry') `,function(err,results){});}
                    res.send("successfully inserted");
            }

       });
        
    });

});



var server = app.listen(8081, function () {})
