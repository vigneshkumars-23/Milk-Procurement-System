var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
var fs = require('fs');
var path = require('path');

var filePath = path.join(__dirname, '../RegFarmer.html');

var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "password",
  database: "mydb"
});

app.set('view engine','ejs');
app.use(express.static("public"));

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.post('/login', urlencodedParser, function(req, res){



      if(req.body.logintype=="farmer"){

                    con.connect(function(err){ 
                      con.query(`select * from login where ( email='${req.body.email}' && password='${req.body.password}' && role='${req.body.logintype}'); `,function(err,results){
                        console.log(req.body);
                        if(results.length == 0){res.send("No Farmer records with this credentials");}
                        else{   
                              res.render('farmerpage',{username: req.body.email});
                        }
                        
                        });
                    });

      }
      else if(req.body.logintype=="society"){

                    con.connect(function(err){
                      con.query(`select * from login where ( email='${req.body.email}' && password='${req.body.password}' && role='${req.body.logintype}'); `,function(err,results){
                  
                        if(results.length == 0){res.send("No Soceity records with this credentials");}
                        else{   
                              res.render('societypage',{username: req.body.email});
                        }
                        
                        });
                      });
        
      }
      else if(req.body.logintype=="chillingsystem"){

        con.connect(function(err){
          con.query(`select * from login where email='${req.body.email}' && password='${req.body.password}' && role='${req.body.logintype}' ; `,function(err,results){
      
            if(results.length == 0){res.send("No chillingsystem records with this credentials");}
            else{   
                  res.render('chillingsystempage',{username: req.body.email});
            }
            
            });
          });

      }
      else if(req.body.logintype=="industry"){

          con.connect(function(err){
            con.query(`select * from login where email='${req.body.email}' && password='${req.body.password}' && role='${req.body.logintype}' ; `,function(err,results){
        
              if(results.length == 0){res.send("No industry records with this credentials");}
              else{   
                    res.render('industrypage',{username: req.body.email});
              }
              
              });
            });

      }
      else if(req.body.logintype=="admin"){

        con.connect(function(err){
          con.query(`select * from login where email='${req.body.email}' && password='${req.body.password}' && role='${req.body.logintype}' ; `,function(err,results){
      
            if(results.length == 0){res.send("No industry records with this credentials");}
            else{   
                  res.render('adminpage',{username: req.body.email});
            }
            
            });
          });

      }
      else{

      }

});

app.listen(3000);
