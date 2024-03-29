

$(function () {

    $('#get-personal').on('click', function () {

            document.getElementById("display").innerHTML="";
            var tbodyEl = $('tbody');
            var theadEl = $('thead');
            theadEl.html('');
            tbodyEl.html('');

        $.ajax({
            url: 'http://localhost:8081/society/get-personal',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ username: document.getElementById("username").innerHTML }),
            success: function (response) {
                var temp = $('div#display');
                temp.html('');
                //response.details.forEach(function (detail) {
                    temp.append('\
                            <div class="card m-auto pl-2 border-bottom-0">\
                            <div class="card-body">\
                            <h3 class="card-title"><b>Personal details</b></h3>\
                            <p class="card-text text-dark font-weight-bold">Society aadhaar : '+ response.details[0].aadhaarS + '<br>\
                            Chilling aadhaar : '+ response.details[0].aadhaarC + '<br>\
                            Email : '+ response.details[0].societyEmail + '<br>\
                            Cow Milk Rate   : '+ response.details[0].basecmrate + '<br>\
                            Buffalo Milk Rate: '+ response.details[0].basebmrate + '<br>\
                            Buffalo Milk Rate: '+ response.details[0].basebmrate + '<br>\
                            Door No: '+ response.details[0].doorNo + '<br>\
                            Locality: '+ response.details[0].locality + '<br>\
                            Pincode: '+ response.details[0].pincode + '<br>\
                            PhoneNo: '+ response.details[0].phoneNo + '</p>\
                            </div></div>\
                           ');
               // });

            }
        });
    });

    $('#change-pass').on('click', function () {
        var temp1 = $('div#details');
        var temp2 = $('div#display');
        var tbodyEl = $('tbody');
        var theadEl = $('thead');
        temp1.html('');
        temp2.html('');
        theadEl.html('');
        tbodyEl.html('');
        temp2.append(`\
        <br>\
        <div class="container pt-3>\
        <form>\
        <div class="form-group">\
        <label for="oldpass">Current password </label>\
        <input class="input-group-sm form-control w-75" type="password" id="oldpass" name="oldpass">\
        <input class="p-1 m-1 ml-0" type="checkbox" onclick=myFunction1()>Show Password\
        </div>\
        <div class="form-group">\
        <label for="newpass">New password </label>\
        <input class="input-group-sm form-control w-75" type="password" id="newpass" name="newpass">\
        <input class="p-1 m-1 ml-0" type="checkbox" onclick=myFunction2()>Show Password\
        </div>\
        <div class="form-group">\
        <label for="confpass">Confirm password </label>\
        <input class="input-group-sm form-control w-75" type="password" id="confpass" name="confpass">\
        <input class="p-1 m-1 ml-0" type="checkbox" onclick=myFunction3()>Show Password\
        </div>\
        <button class="btn btn-dark" id="change">\
                Confirm\
        </button>\
        </form>\
        </div>\
        `);
        var linkJS = $('body');
        linkJS.append('\
                    <script>\
                    function myFunction1() {\
                        var x = document.getElementById("oldpass");\
                        if (x.type === "password") {\
                          x.type = "text";\
                        } else {\
                          x.type = "password";\
                        }\
                      }\
                      function myFunction2() {\
                        var x = document.getElementById("newpass");\
                        if (x.type === "password") {\
                          x.type = "text";\
                        } else {\
                          x.type = "password";\
                        }\
                      }\
                      function myFunction3() {\
                        var x = document.getElementById("confpass");\
                        if (x.type === "password") {\
                          x.type = "text";\
                        } else {\
                          x.type = "password";\
                        }\
                      }\
                    </script>\
                    ');
        $('#change').on('click', function () {
            var oldpass = document.getElementById("oldpass").value;
            var newpass = document.getElementById("newpass").value;
            var confpass = document.getElementById("confpass").value;

            if (newpass != confpass) {
                document.getElementById("details").innerHTML += "Passwords did not match";
            }
            else {

                $.ajax({
                    url: 'http://localhost:8081/society/change-pass',
                    method: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify({ username: document.getElementById("username").innerHTML, oldpass: oldpass, newpass: newpass }),
                    success: function (response) {
                        var temp1 = $('div#details');
                        //var temp2 = $('div#display');
                        var tbodyEl = $('tbody');
                        var theadEl = $('thead');
                        temp1.html('');
                        //temp2.html('');
                        theadEl.html('');
                        tbodyEl.html('');
                        document.getElementById("display").innerHTML += response;
                    }
                });
            }
        });
    });

    $('#get-farmertransac').on('click', function () {

        var temp = $('div#display');
        temp.html('');
        var tbodyEl = $('tbody');
        var theadEl = $('thead');
        theadEl.html('');
        tbodyEl.html('');

        temp.append('\
                <div class="container pt-3">\
                <form id="transacform">\
                    <div class="form-group">\
                    <label for="faadhaar">Farmer aadhaar</label>\
                    <input class="form-control w-50" type="text" id="faadhaar" name="faadhaar">\
                    </div>\
                    <div class="form-group">\
                    <label for="fromdate">From  </label>\
                    <input class="form-control w-50" type="date" id="fromdate" name="fromdate">\
                    </div>\
                    <div class="form-group">\
                    <label for="todate">To  </label>\
                    <input class="form-control w-50" type="date" id="todate" name="todate">\
                    </div>\
                    <button class="btn btn-dark">submit</button><br>\
                </form>\
                </div>\
                ');

        $('#transacform').on('submit', function (event) {
            event.preventDefault();
            var aadhaar = jQuery("#faadhaar").val();
            var fdate = jQuery("#fromdate").val();
            var tdate = jQuery("#todate").val();
            console.log(aadhaar);
            console.log("from date: "+fdate);
            console.log("to date: "+tdate);

            $.ajax({
                url: 'http://localhost:8081/society/get-farmertransac',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ username: document.getElementById("username").innerHTML, aadhaar: aadhaar, fdate: fdate, tdate: tdate }),
                success: function (response) {

                    var tbodyEl = $('tbody');
                    var theadEl = $('thead');

                    theadEl.html('');
                    tbodyEl.html('');

                    theadEl.append(`
                                    <tr>
                                        <th>Transaction ID</th>
                                        <th>Date</th>
                                        <th>Time</th>
                                        <th>Farmer Email</th>
                                        <th>Cow Milk (litres)</th>
                                        <th>Cow Milk Fat (%)</th>
                                        <th>Amount-1</th>
                                        <th>Buffalo Milk (litres)</th>
                                        <th>Buffalo Milk Fat (%)</th>
                                        <th>Amount-2</th>
                                        <th>Total</th>
                                    </tr>
                                `);


                    response.details.forEach(function (detail) {
                        tbodyEl.append('\
                                    <tr>\
                                        <td class="id">' + detail.transacId + '</td>\
                                        <td class="id">' + detail.date + '</td>\
                                        <td class="id">' + detail.time + '</td>\
                                        <td class="id">' + detail.farmerEmail + '</td>\
                                        <td class="id">' + detail.cowMilk + ' L</td>\
                                        <td class="id">' + detail.CMFatPercent + ' %</td>\
                                        <td class="id">' + detail.amount1 + ' . Rs</td>\
                                        <td class="id">' + detail.buffaloMilk + ' L</td>\
                                        <td class="id">' + detail.BMFatPercent + ' %</td>\
                                        <td class="id">' + detail.amount2 + ' . Rs</td>\
                                        <td class="id">' + detail.total + ' . Rs</td>\
                                    </tr>\
                                    ');
                    });
                }


            });

        });

    });



    $('#ownrecords').on('click', function () {

        var temp = $('div#display');
        temp.html('');
        var tbodyEl = $('tbody');
        var theadEl = $('thead');
        theadEl.html('');
        tbodyEl.html('');

        temp.append('\
                <div class="container pt-3">\
                <form id="transacform">\
                    <div class="form-group">\
                    <label for="fromdate">From :  </label>\
                    <input class="form-control w-50" type="date" id="fromdate" name="fromdate">\
                    </div>\
                    <div class="form-group">\
                    <label for="todate">To :  </label>\
                    <input class="form-control w-50" type="date" id="todate" name="todate">\
                    </div>\
                    <button class="btn btn-dark">Submit</button><br>\
                </form>\
                </div>\
                ');

        $('#transacform').on('submit', function (event) {
            
            event.preventDefault();
            var fdate = jQuery("#fromdate").val();
            var tdate = jQuery("#todate").val();
 

            $.ajax({
                url: 'http://localhost:8081/society/get-ownrecords',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ username: document.getElementById("username").innerHTML, fdate: fdate, tdate: tdate }),
                success: function (response) {

                    var tbodyEl = $('tbody');
                    var theadEl = $('thead');

                    theadEl.html('');
                    tbodyEl.html('');

                    theadEl.append(`
                                    <tr>
                                        <th>Transaction ID</th>
                                        <th>Date</th>
                                        <th>Time</th>
                                        <th>Chilling Email</th>
                                        <th>Cow Milk (litres)</th>
                                        <th>Cow Milk Fat (%)</th>
                                        <th>Amount-1</th>
                                        <th>Buffalo Milk (litres)</th>
                                        <th>Buffalo Milk Fat (%)</th>
                                        <th>Amount-2</th>
                                        <th>Total</th>
                                    </tr>
                                `);


                    response.details.forEach(function (detail) {
                        console.log(detail);
                        tbodyEl.append('\
                                    <tr>\
                                        <td class="id">' + detail.transacId + '</td>\
                                        <td class="id">' + detail.date + '</td>\
                                        <td class="id">' + detail.time + '</td>\
                                        <td class="id">' + detail.chillingEmail + '</td>\
                                        <td class="id">' + detail.cowMilk + ' L</td>\
                                        <td class="id">' + detail.CMFatPercent + ' %</td>\
                                        <td class="id">' + detail.amount1 + ' . Rs</td>\
                                        <td class="id">' + detail.buffaloMilk + ' L</td>\
                                        <td class="id">' + detail.BMFatPercent + ' %</td>\
                                        <td class="id">' + detail.amount2 + ' . Rs</td>\
                                        <td class="id">' + detail.total + ' . Rs</td>\
                                    </tr>\
                                    ');
                    });
                }


            });

        });


    });



    $('#get-farmer').on('click', function (event) {
                
        var temp = $('div#display');
        temp.html('');
        var tbodyEl = $('tbody');
        var theadEl = $('thead');
        theadEl.html('');
        tbodyEl.html('');

        $.ajax({
            url: 'http://localhost:8081/society/get-farmer',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ username: document.getElementById("username").innerHTML }),
            success: function (response) {
                var tbodyEl = $('tbody');
                var theadEl = $('thead');

                theadEl.html('');
                tbodyEl.html('');

                theadEl.append(`
                        <tr>
                            <th>First Name: </th>
                            <th>Last Name: </th>
                            <th>Aadhaar</th>
                            <th>Farmer Email</th>
                        </tr>
                    `);


                response.details.forEach(function (detail) {
                    console.log(detail);
                    tbodyEl.append('\
                        <tr>\
                        <td class="id">' + detail.firstName + '</td>\
                        <td class="id">' + detail.lastName + '</td>\
                        <td class="id">' + detail.aadhaarF + '</td>\
                        <td class="id">' + detail.farmerEmail + '</td>\
                        </tr>\
                        ');
                });
            }
        });
    });

    

    $('#enterdata').on('click', function (event) {

        event.preventDefault();

        var temp = $('div#display');
        temp.html('');
        var tbodyEl = $('tbody');
        var theadEl = $('thead');
        theadEl.html('');
        tbodyEl.html('');

        temp.append('\
            <div class="container pt-3 clearfix">\
            <form id="inputdetails">\
            <div class="float-left m-1 w-auto">\
            <div class="form-group">\
            <label for="faadhaar">Farmer aadhaar</label>\
            <input class="form-control" type="text" id="faadhaar" name="faadhaar">\
            </div>\
            <div class="form-group">\
            <label for="date">Date</label>\
            <input class="form-control" type="date" id="date" name="date">\
            </div>\
            <div class="form-group">\
            <label for="time">time</label>\
            <input class="form-control" type="time" id="time" name="time">\
            </div>\
            <div class="form-group">\
            <label for="cowmilk">cow milk :  </label>\
            <input class="form-control" type="number" id="cowmilk" step=0.01 name="cowmilk">\
            </div>\
            </div>\
            <div class="float-right m-1 w-auto">\
            <div class="form-group">\
            <label for="buffalomilk">Buffalo milk :  </label>\
            <input class="form-control" type="number" id="buffalomilk" step=0.01 name="buffalomilk">\
            </div>\
            <div class="form-group">\
            <label for="cowmilkfatpercent">cow milk fat percent :  </label>\
            <input class="form-control" type="number" id="cowmilkfatpercent" step=0.01 name="cowmilkfatpercent">\
            </div>\
            <div class="form-group">\
            <label for="buffalomilkfatpercent">Buffalo milk percent:  </label>\
            <input class="form-control" type="number" id="buffalomilkfatpercent" step=0.01 name="buffalomilkfatpercent">\
            </div>\
            <button class="btn btn-dark">submit</button>\
            </div>\
            </form>\
            </div>\
            ');



        $('#inputdetails').on('submit', function (event) {
            event.preventDefault();

            var faadhaar1 = jQuery("#faadhaar").val();
            var date1 = jQuery("#date").val();
            var time1 = jQuery("#time").val();
            var cowmilk1 = jQuery("#cowmilk").val();
            var buffalomilk1 = jQuery("#buffalomilk").val();
            var cowmilkfatpercent1 = jQuery("#cowmilkfatpercent").val();
            var buffalomilkfatpercent1 = jQuery("#buffalomilkfatpercent").val();

            $.ajax({

                url: 'http://localhost:8081/society/enterdata',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ username: document.getElementById("username").innerHTML, faadhaar: faadhaar1, transacid: Math.floor((Math.random() * 100000) + 1), date: date1, time: time1, cowmilk: cowmilk1, buffalomilk: buffalomilk1, cowmilkfatpercent: cowmilkfatpercent1, buffalomilkfatpercent: buffalomilkfatpercent1 }),
                success: function (response) {
                    document.getElementById("display").innerHTML += response;
                }
            });

        });


    });





});