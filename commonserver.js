let express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
let app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: true });

var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "password",
  database: "mydb",
  port: '3306'
});

app.use(bodyParser.json());
app.use(urlencodedParser);
app.use(express.static(__dirname+"/public"));

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



























app.post('/society/get-personal', urlencodedParser, function (req, res) {
    con.connect(function(err){
        console.log("connected to database");
        con.query(`select S.aadhaarS,S.aadhaarC,S.societyEmail,S.basecmrate,S.basebmrate,S.doorNo,S.locality,S.pincode,P.city ,ph.phoneNo from society S,pincode P ,phonebook ph where s.societyEmail="${req.body.username}" and S.pincode=P.pincode and ph.aadhaar=S.aadhaarS;`,function(err,results){
               console.log(results);
               res.send({details: results});
        });
    });
});

app.post('/society/get-farmer', urlencodedParser, function (req, res) {
    con.connect(function(err){
        console.log("connected to database ");
        con.query(`select F.firstName,F.lastName,F.aadhaarF,F.farmerEmail from farmer F,society S where S.societyEmail="${req.body.username}" and F.aadhaarS=S.aadhaarS;`,function(err,results){
             console.log(results);
             res.send({details: results});
        });
    });
});

app.post('/society/change-pass', urlencodedParser, function (req, res) {
    console.log(req.body.username);
    console.log(req.body.oldpass);
    console.log(req.body.newpass);
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


app.post('/society/enterdata', urlencodedParser, function (req, res) {

    con.connect(function(err){
        
        console.log(req.body);
        con.query(`insert into testphase values (${req.body.transacid},'${req.body.date}','${req.body.time}',${req.body.faadhaar},(select aadhaarS from society where societyEmail="${req.body.username}"));`,function(err,results){
            // console.log("error1: "+err);
        });
        con.query(`select basecmrate,basebmrate from society where societyEmail="${req.body.username}"`,function(err,results){
            // console.log("error2: "+err);
            con.query(`insert into rate values (${req.body.transacid},${req.body.cowmilk},${req.body.buffalomilk},${req.body.cowmilkfatpercent},${req.body.buffalomilkfatpercent},${results[0].basecmrate},${results[0].basebmrate});`,function(err,results){
                // console.log("error3: "+err);
            });
        });
        res.send("successfully inserted");

    });

});

app.post('/society/get-ownrecords', urlencodedParser, function (req, res) {

    con.connect(function(err){
        
        con.query(`select t.transacId,DATE_FORMAT(t.date,"%d %M %Y") as date,t.time,c.chillingEmail,r.cowMilk,r.CMFatPercent,r.basecmrate,(r.cowMilk*r.CMFatPercent*r.basecmrate)/100 as amount1,r.buffaloMilk,r.BMFatPercent,r.basebmrate,(r.buffaloMilk*r.BMFatPercent*r.basebmrate)/100 as amount2 ,(r.buffaloMilk*r.BMFatPercent*r.basebmrate + r.cowMilk*r.CMFatPercent*r.basecmrate)/100 as total from rate r,testphase t,society s,chillingsystem c where t.transacId=r.transacId and t.aadhaar1=s.aadhaarS and c.aadhaarC=s.aadhaarC and s.societyEmail="${req.body.username}" and date>="${req.body.fdate}" and date<="${req.body.tdate}";`,function(err,results){
            console.log(results);
            res.send({details: results});
        });

    });

});



app.post('/society/get-farmertransac', urlencodedParser, function (req, res) {
    con.connect(function(err){


        if(req.body.fdate=="" && req.body.tdate==""){
            if(req.body.aadhaar==""){
                con.query(`select t.transacId,DATE_FORMAT(t.date,"%d %M %Y") as date,t.time,f.farmerEmail,r.cowMilk,r.CMFatPercent,r.basecmrate,(r.cowMilk*r.CMFatPercent*r.basecmrate)/100 as amount1,r.buffaloMilk,r.BMFatPercent,r.basebmrate,(r.buffaloMilk*r.BMFatPercent*r.basebmrate)/100 as amount2 ,(r.buffaloMilk*r.BMFatPercent*r.basebmrate + r.cowMilk*r.CMFatPercent*r.basecmrate)/100 as total from rate r,testphase t,farmer f,society s where t.transacId=r.transacId and t.aadhaar1=f.aadhaarF and f.aadhaarS=s.aadhaarS and s.societyEmail="${req.body.username}";`,function(err,results){
                    console.log(results);
                    res.send({details: results});
                });
            }
            else{
                con.query(`select t.transacId,DATE_FORMAT(t.date,"%d %M %Y") as date,t.time,f.farmerEmail,r.cowMilk,r.CMFatPercent,r.basecmrate,(r.cowMilk*r.CMFatPercent*r.basecmrate)/100 as amount1,r.buffaloMilk,r.BMFatPercent,r.basebmrate,(r.buffaloMilk*r.BMFatPercent*r.basebmrate)/100 as amount2 ,(r.buffaloMilk*r.BMFatPercent*r.basebmrate + r.cowMilk*r.CMFatPercent*r.basecmrate)/100 as total from rate r,testphase t,farmer f,society s where t.transacId=r.transacId and t.aadhaar1=f.aadhaarF and f.aadhaarS=s.aadhaarS and s.societyEmail="${req.body.username}" and f.aadhaarF=${req.body.aadhaar};`,function(err,results){
                    console.log(results);
                    res.send({details: results});
                });
            }
        }
        else{
            if(req.body.aadhaar==""){
                con.query(`select t.transacId,DATE_FORMAT(t.date,"%d %M %Y") as date,t.time,f.farmerEmail,r.cowMilk,r.CMFatPercent,r.basecmrate,(r.cowMilk*r.CMFatPercent*r.basecmrate)/100 as amount1,r.buffaloMilk,r.BMFatPercent,r.basebmrate,(r.buffaloMilk*r.BMFatPercent*r.basebmrate)/100 as amount2 ,(r.buffaloMilk*r.BMFatPercent*r.basebmrate + r.cowMilk*r.CMFatPercent*r.basecmrate)/100 as total from rate r,testphase t,farmer f,society s where t.transacId=r.transacId and t.aadhaar1=f.aadhaarF and f.aadhaarS=s.aadhaarS and s.societyEmail="${req.body.username}" and t.date>="${req.body.fdate}" and t.date<="${req.body.tdate}";`,function(err,results){
                    console.log(results);
                    res.send({details: results});
                });
            }
            else{
                con.query(`select t.transacId,DATE_FORMAT(t.date,"%d %M %Y") as date,t.time,f.farmerEmail,r.cowMilk,r.CMFatPercent,r.basecmrate,(r.cowMilk*r.CMFatPercent*r.basecmrate)/100 as amount1,r.buffaloMilk,r.BMFatPercent,r.basebmrate,(r.buffaloMilk*r.BMFatPercent*r.basebmrate)/100 as amount2 ,(r.buffaloMilk*r.BMFatPercent*r.basebmrate + r.cowMilk*r.CMFatPercent*r.basecmrate)/100 as total from rate r,testphase t,farmer f,society s where t.transacId=r.transacId and t.aadhaar1=f.aadhaarF and f.aadhaarS=s.aadhaarS and s.societyEmail="${req.body.username}" and t.date>="${req.body.fdate}" and t.date<="${req.body.tdate}" and f.aadhaarF=${req.body.aadhaar} ;`,function(err,results){
                    console.log(results);
                    res.send({details: results});
                });
            }
        }

    });
});


























app.post('/chilling/get-personal', urlencodedParser, function (req, res) {
    con.connect(function(err){
        console.log(req.body.username);
        con.query(`select C.aadhaarC,C.aadhaarI,C.chillingEmail,C.basecmrate,C.basebmrate,C.doorNo,C.locality,C.pincode,P.city ,ph.phoneNo from chillingsystem C,pincode P ,phonebook ph where C.chillingEmail="${req.body.username}" and C.pincode=P.pincode and ph.aadhaar=C.aadhaarC;`,function(err,results){
             console.log(results);
               res.send({details: results});
        });
    });
});

app.post('/chilling/get-society', urlencodedParser, function (req, res) {
    con.connect(function(err){
        console.log("connected to database ");
        con.query(`select * from society where aadhaarC=(select aadhaarC from chillingsystem where chillingEmail="${req.body.username}");`,function(err,results){
            //  console.log(results[0]);
               res.send({details: results});
        });
    });
});

app.post('/chilling/change-pass', urlencodedParser, function (req, res) {
    con.connect(function(err){
        con.query(`select * from login where email='${req.body.username}' and password='${req.body.oldpass}' and role='chillingsystem';`,function(err,results){
            
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




app.post('/chilling/enterdata', urlencodedParser, function (req, res) {
    con.connect(function(err){
        console.log(req.body);
        con.query(`insert into testphase values (${req.body.transacid},'${req.body.date}','${req.body.time}',${req.body.saadhaar},(select aadhaarC from chillingsystem where chillingEmail="${req.body.username}"));`,function(err,results){
        });
        con.query(`select basecmrate,basebmrate from chillingsystem where chillingEmail="${req.body.username}"`,function(err,results){
            con.query(`insert into rate values (${req.body.transacid},${req.body.cowmilk},${req.body.buffalomilk},${req.body.cowmilkfatpercent},${req.body.buffalomilkfatpercent},${results[0].basecmrate},${results[0].basebmrate});`,function(err,results){
            });
        });
        con.query(`insert into vehiclelink values (${req.body.transacid},${req.body.number},"${req.body.driver}")`,function(err,results){});
        res.send("successfully inserted");
    });
});



app.post('/chilling/ownrecords', urlencodedParser, function (req, res) {

    con.connect(function(err){
        
        con.query(`select t.transacId,DATE_FORMAT(t.date,"%d %M %Y") as date,t.time,i.industryEmail,r.cowMilk,r.CMFatPercent,r.basecmrate,(r.cowMilk*r.CMFatPercent*r.basecmrate)/100 as amount1,r.buffaloMilk,r.BMFatPercent,r.basebmrate,(r.buffaloMilk*r.BMFatPercent*r.basebmrate)/100 as amount2 ,(r.buffaloMilk*r.BMFatPercent*r.basebmrate + r.cowMilk*r.CMFatPercent*r.basecmrate)/100 as total from rate r,testphase t,chillingsystem c,industry i where t.transacId=r.transacId and t.aadhaar1=c.aadhaarC and c.aadhaarI=i.aadhaarI and c.chillingEmail="${req.body.username}" and date>="${req.body.fdate}" and date<="${req.body.tdate}";`,function(err,results){
            console.log(results);
            res.send({details: results});
        });

    });

});



app.post('/chilling/get-societytransac', urlencodedParser, function (req, res) {
    con.connect(function(err){


        if(req.body.fdate=="" && req.body.tdate==""){
            if(req.body.aadhaar==""){
                con.query(`select t.transacId,DATE_FORMAT(t.date,"%d %M %Y") as date,t.time,s.societyEmail,r.cowMilk,r.CMFatPercent,r.basecmrate,(r.cowMilk*r.CMFatPercent*r.basecmrate)/100 as amount1,
                r.buffaloMilk,r.BMFatPercent,r.basebmrate,(r.buffaloMilk*r.BMFatPercent*r.basebmrate)/100 as amount2 ,(r.buffaloMilk*r.BMFatPercent*r.basebmrate + r.cowMilk*r.CMFatPercent*r.basecmrate)/100 as total
                 from rate r,testphase t,society s,chillingsystem c where t.transacId=r.transacId and t.aadhaar1=s.aadhaarS and s.aadhaarC=c.aadhaarC and c.chillingEmail="${req.body.username}";`,function(err,results){
                    console.log(results);
                    res.send({details: results});
                });
            }
            else{
                con.query(`select t.transacId,DATE_FORMAT(t.date,"%d %M %Y") as date,t.time,s.societyEmail,r.cowMilk,r.CMFatPercent,r.basecmrate,(r.cowMilk*r.CMFatPercent*r.basecmrate)/100 as amount1,
                r.buffaloMilk,r.BMFatPercent,r.basebmrate,(r.buffaloMilk*r.BMFatPercent*r.basebmrate)/100 as amount2 ,(r.buffaloMilk*r.BMFatPercent*r.basebmrate + r.cowMilk*r.CMFatPercent*r.basecmrate)/100 as total
                 from rate r,testphase t,society s,chillingsystem c where t.transacId=r.transacId and t.aadhaar1=s.aadhaarS and s.aadhaarC=c.aadhaarC and c.chillingEmail="${req.body.username}" and t.aadhaar1=${req.body.aadhaar};`,function(err,results){
                    console.log(results);
                    res.send({details: results});
                });
            }
        }
        //else if(req.body.fdate=="" || req.body.tdate==""){res.send();}
        else{
            if(req.body.aadhaar==""){
                con.query(`select t.transacId,DATE_FORMAT(t.date,"%d %M %Y") as date,t.time,s.societyEmail,r.cowMilk,r.CMFatPercent,r.basecmrate,(r.cowMilk*r.CMFatPercent*r.basecmrate)/100 as amount1,
                r.buffaloMilk,r.BMFatPercent,r.basebmrate,(r.buffaloMilk*r.BMFatPercent*r.basebmrate)/100 as amount2 ,(r.buffaloMilk*r.BMFatPercent*r.basebmrate + r.cowMilk*r.CMFatPercent*r.basecmrate)/100 as total
                 from rate r,testphase t,society s,chillingsystem c where t.transacId=r.transacId and t.aadhaar1=s.aadhaarS and s.aadhaarC=c.aadhaarC and c.chillingEmail="${req.body.username}" and t.date>="${req.body.fdate}" and t.date<="${req.body.tdate}";`,function(err,results){
                    console.log(results);
                    res.send({details: results});
                });
            }
            else{
                con.query(`select t.transacId,DATE_FORMAT(t.date,"%d %M %Y") as date,t.time,s.societyEmail,r.cowMilk,r.CMFatPercent,r.basecmrate,(r.cowMilk*r.CMFatPercent*r.basecmrate)/100 as amount1,
                r.buffaloMilk,r.BMFatPercent,r.basebmrate,(r.buffaloMilk*r.BMFatPercent*r.basebmrate)/100 as amount2 ,(r.buffaloMilk*r.BMFatPercent*r.basebmrate + r.cowMilk*r.CMFatPercent*r.basecmrate)/100 as total
                 from rate r,testphase t,society s,chillingsystem c where t.transacId=r.transacId and t.aadhaar1=s.aadhaarS and s.aadhaarC=c.aadhaarC and c.chillingEmail="${req.body.username}" and t.date>="${req.body.fdate}" and t.date<="${req.body.tdate}" and t.aadhaar1=${req.body.aadhaar};`,function(err,results){
                    console.log(results);
                    res.send({details: results});
                });
            }
        }

    });
});



















app.post('/industry/get-personal', urlencodedParser, function (req, res) {
    con.connect(function(err){
        console.log("connected to database");
        con.query(`select i.aadhaarI,i.firstName,i.lastName,i.industryEmail,i.basecmrate,i.basebmrate,i.doorNo,i.locality,i.pincode,p.phoneNo from industry i,pincode ph,phonebook p where i.industryEmail="${req.body.username}" and i.aadhaarI=p.aadhaar and i.pincode=ph.pincode;`,function(err,results){
              console.log(results);
               res.send({details: results});
        });
    });
});





app.post('/industry/change-pass', urlencodedParser, function (req, res) {
    con.connect(function(err){
        con.query(`select * from login where email='${req.body.username}' and password='${req.body.oldpass}' and role='industry';`,function(err,results){
            
            if(results.length==0){
                res.send("Old password incorrect");
            }
            else{
                con.query(`update login set password='${req.body.newpass}' where email='${req.body.username}' and role="industry";`,function(err,results){});
                res.send("Successfully changed");
            }

        });
    });
});



app.post('/industry/get-transacdetails', urlencodedParser, function (req, res) {
    con.connect(function(err){


        if(req.body.fdate=="" && req.body.tdate==""){
            if(req.body.aadhaar==""){
                con.query(`select t.transacId,DATE_FORMAT(t.date,"%d %M %Y") as date,t.time,c.chillingEmail,r.cowMilk,r.CMFatPercent,r.basecmrate,(r.cowMilk*r.CMFatPercent*r.basecmrate)/100 as amount1,
                r.buffaloMilk,r.BMFatPercent,r.basebmrate,(r.buffaloMilk*r.BMFatPercent*r.basebmrate)/100 as amount2 ,(r.buffaloMilk*r.BMFatPercent*r.basebmrate + r.cowMilk*r.CMFatPercent*r.basecmrate)/100 as total
                 from rate r,testphase t,chillingsystem c,industry i where t.transacId=r.transacId and t.aadhaar1=c.aadhaarC and c.aadhaarI=i.aadhaarI and i.industryEmail="${req.body.username}";`,function(err,results){
                    console.log(results);
                    res.send({details: results});
                });
            }
            else{
                con.query(`select t.transacId,DATE_FORMAT(t.date,"%d %M %Y") as date,t.time,c.chillingEmail,r.cowMilk,r.CMFatPercent,r.basecmrate,(r.cowMilk*r.CMFatPercent*r.basecmrate)/100 as amount1,
                r.buffaloMilk,r.BMFatPercent,r.basebmrate,(r.buffaloMilk*r.BMFatPercent*r.basebmrate)/100 as amount2 ,(r.buffaloMilk*r.BMFatPercent*r.basebmrate + r.cowMilk*r.CMFatPercent*r.basecmrate)/100 as total
                 from rate r,testphase t,chillingsystem c,industry i where t.transacId=r.transacId and t.aadhaar1=c.aadhaarC and c.aadhaarI=i.aadhaarI and i.industryEmail="${req.body.username}" and t.aadhaar1=${req.body.aadhaar};`,function(err,results){
                    console.log(results);
                    res.send({details: results});
                });
            }
        }
        //else if(req.body.fdate=="" || req.body.tdate==""){res.send();}
        else{
            if(req.body.aadhaar==""){
                con.query(`select t.transacId,DATE_FORMAT(t.date,"%d %M %Y") as date,t.time,c.chillingEmail,r.cowMilk,r.CMFatPercent,r.basecmrate,(r.cowMilk*r.CMFatPercent*r.basecmrate)/100 as amount1,
                r.buffaloMilk,r.BMFatPercent,r.basebmrate,(r.buffaloMilk*r.BMFatPercent*r.basebmrate)/100 as amount2 ,(r.buffaloMilk*r.BMFatPercent*r.basebmrate + r.cowMilk*r.CMFatPercent*r.basecmrate)/100 as total
                 from rate r,testphase t,chillingsystem c,industry i where t.transacId=r.transacId and t.aadhaar1=c.aadhaarC and c.aadhaarI=i.aadhaarI and i.industryEmail="${req.body.username}" and t.date>=${req.body.fdate} and t.date<=${req.body.tdate};`,function(err,results){
                    console.log(results);
                    res.send({details: results});
                });
            }
            else{
                con.query(`select t.transacId,DATE_FORMAT(t.date,"%d %M %Y") as date,t.time,c.chillingEmail,r.cowMilk,r.CMFatPercent,r.basecmrate,(r.cowMilk*r.CMFatPercent*r.basecmrate)/100 as amount1,
                r.buffaloMilk,r.BMFatPercent,r.basebmrate,(r.buffaloMilk*r.BMFatPercent*r.basebmrate)/100 as amount2 ,(r.buffaloMilk*r.BMFatPercent*r.basebmrate + r.cowMilk*r.CMFatPercent*r.basecmrate)/100 as total
                 from rate r,testphase t,chillingsystem c,industry i where t.transacId=r.transacId and t.aadhaar1=c.aadhaarC and c.aadhaarI=i.aadhaarI and i.industryEmail="${req.body.username}" and t.date>=${req.body.fdate} and t.date<=${req.body.tdate} and t.aadhaar1=${req.body.aadhaar};`,function(err,results){
                    console.log(results);
                    res.send({details: results});
                });
            }
        }

    });
});



app.post('/industry/enterdata', urlencodedParser, function (req, res) {
    con.connect(function(err){
        console.log(req.body);
        con.query(`insert into testphase values (${req.body.transacid},'${req.body.date}','${req.body.time}',${req.body.caadhaar},(select aadhaarI from industry where industryEmail="${req.body.username}"));`,function(err,results){
        });
        con.query(`select basecmrate,basebmrate from industry where industryEmail="${req.body.username}"`,function(err,results){
            con.query(`insert into rate values (${req.body.transacid},${req.body.cowmilk},${req.body.buffalomilk},${req.body.cowmilkfatpercent},${req.body.buffalomilkfatpercent},${results[0].basecmrate},${results[0].basebmrate});`,function(err,results){
            });
        });
        con.query(`insert into vehiclelink values (${req.body.transacid},${req.body.number},"${req.body.driver}")`,function(err,results){});
        res.send("successfully inserted");
    });
});







var server = app.listen(8081, function () {});
