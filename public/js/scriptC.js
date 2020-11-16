

$(function () {

    

    $('#get-personal').on('click', function () {

        document.getElementById("display").innerHTML="";
        var tbodyEl = $('tbody');
        var theadEl = $('thead');
        theadEl.html('');
        tbodyEl.html('');

        $.ajax({
            url: 'http://localhost:8081/chilling/get-personal',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ username: document.getElementById("username").innerHTML }),
            success: function (response) {
                var temp = $('div#display');
                temp.html('');

                        temp.append('\
                        <div class="card m-auto pl-2 border-bottom-0">\
                        <div class="card-body">\
                        <h3 class="card-title"><b>Personal details</b></h3>\
                        <p class="card-text text-dark font-weight-bold">Society aadhaar : '+ response.details[0].aadhaarC + '<br>\
                        Chilling aadhaar : '+ response.details[0].aadhaarI + '<br>\
                        Email : '+ response.details[0].chillingEmail + '<br>\
                        Cow Milk Rate   : '+ response.details[0].basecmrate + '<br>\
                        Buffalo Milk Rate: '+ response.details[0].basebmrate + '<br>\
                        Buffalo Milk Rate: '+ response.details[0].basebmrate + '<br>\
                        Door No: '+ response.details[0].doorNo + '<br>\
                        Locality: '+ response.details[0].locality + '<br>\
                        Pincode: '+ response.details[0].pincode + '<br>\
                        PhoneNo: '+ response.details[0].phoneNo + '</p>\
                        </div></div>\
                    ');

            }
        });
    });

    $('#change-pass').on('click', function () {

        document.getElementById("display").innerHTML="";
        var tbodyEl = $('tbody');
        var theadEl = $('thead');
        theadEl.html('');
        tbodyEl.html('');

        var temp = $('div#display');
        temp.html('');
        temp.append('\
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
        ');
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
                document.getElementById("display").innerHTML += "Passwords did not match";
            }
            else {

                $.ajax({
                    url: 'http://localhost:8081/chilling/change-pass',
                    method: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify({ username: document.getElementById("username").innerHTML, oldpass: oldpass, newpass: newpass }),
                    success: function (response) {
                        document.getElementById("display").innerHTML += response;
                    }
                });
            }

        });
    });

    $('#get-societytransac').on('click', function () {

        document.getElementById("display").innerHTML="";
        var tbodyEl = $('tbody');
        var theadEl = $('thead');
        theadEl.html('');
        tbodyEl.html('');

        var temp = $('div#display');
        temp.html('');
        temp.append('\
            <div class="container pt-3">\
            <form id="transacform">\
                <div class="form-group">\
                <label for="saadhaar">Society aadhaar</label>\
                <input class="form-control" type="text" id="saadhaar" name="saadhaar"><br>\
                </div>\
                <div class="form-group">\
                <label for="fromdate">From :  </label>\
                <input class="form-control" type="date" id="fromdate" name="fromdate"><br>\
                </div>\
                <div class="form-group">\
                <label for="todate">To :  </label>\
                <input class="form-control" type="date" id="todate" name="todate"><br>\
                </div>\
                <button class="btn btn-dark">Submit</button><br>\
            </form>\
            </div>\
            ');

        $('#transacform').on('submit', function (event) {
            event.preventDefault();
            var aadhaar = jQuery("#saadhaar").val();
            var fdate = jQuery("#fromdate").val();
            var tdate = jQuery("#todate").val();

            $.ajax({
                url: 'http://localhost:8081/chilling/get-societytransac',
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
                                    <th>Society Email</th>
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
                                        <td class="id">' + detail.societyEmail + '</td>\
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

        document.getElementById("display").innerHTML="";
        var tbodyEl = $('tbody');
        var theadEl = $('thead');
        theadEl.html('');
        tbodyEl.html('');

        var temp = $('div#display');
        temp.html('');
        temp.append('\
            <div class="container pt-3">\
            <form id="transacform">\
                <div class="form-group">\
                <label for="fromdate">From :  </label>\
                <input class="form-control" type="date" id="fromdate" name="fromdate"><br>\
                </div>\
                <div class="form-group">\
                <label for="todate">To :  </label>\
                <input class="form-control" type="date" id="todate" name="todate"><br>\
                </div>\
                <button class="btn btn-dark">submit</button><br>\
            </form>\
            </div>\
            ');

        $('#transacform').on('submit', function (event) {
            event.preventDefault();
            var fdate = jQuery("#fromdate").val();
            var tdate = jQuery("#todate").val();

            $.ajax({
                url: 'http://localhost:8081/chilling/ownrecords',
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
                                    <th>Industry Email</th>
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
                                        <td class="id">' + detail.industryEmail + '</td>\
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


    $('#get-society').on('click', function (event) {

        document.getElementById("display").innerHTML="";
        var tbodyEl = $('tbody');
        var theadEl = $('thead');
        theadEl.html('');
        tbodyEl.html('');

        $.ajax({
            url: 'http://localhost:8081/chilling/get-society',
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
                        <th>Society Aadhaar </th>
                        <th>SocietyEmail</th>
                        <th>Locality</th>
                        <th>Pincode</th>
                    </tr>
                `);


                response.details.forEach(function (detail) {
                    console.log(detail);
                    tbodyEl.append('\
                    <tr>\
                    <td class="id">' + detail.aadhaarS + '</td>\
                    <td class="id">' + detail.societyEmail + '</td>\
                    <td class="id">' + detail.locality + '</td>\
                    <td class="id">' + detail.pincode + '</td>\
                    </tr>\
                    ');
                });
            }
        });
    });


    $('#enterdata').on('click', function (event) {

        document.getElementById("display").innerHTML="";
        var tbodyEl = $('tbody');
        var theadEl = $('thead');
        theadEl.html('');
        tbodyEl.html('');

        event.preventDefault();

        var temp = $('div#display');
        temp.html('');
        temp.append('\
        <div class="container pt-3 clearfix">\
            <form id="inputdetails">\
            <div class="float-left m-1 w-auto">\
            <div class="form-group">\
            <label for="saadhaar">society aadhaar</label>\
            <input class="form-control" type="text" id="saadhaar" name="saadhaar"><br>\
            </div>\
            <div class="form-group">\
            <label for="date">Date</label>\
            <input class="form-control" type="date" id="date" name="date"><br>\
            </div>\
            <div class="form-group">\
            <label for="time">Time</label>\
            <input class="form-control" type="time" id="time" name="time"><br>\
            </div>\
            <div class="form-group">\
            <label for="cowmilk">Cow milk (litres):  </label>\
            <input class="form-control" type="number" id="cowmilk" step=0.01 name="cowmilk"><br>\
            </div>\
            <div class="form-group">\
            <label for="buffalomilk">Buffalo milk (litres):  </label>\
            <input class="form-control" type="number" id="buffalomilk" step=0.01 name="buffalomilk"><br>\
            </div>\
            </div>\
            <div class="float-right m-1 w-auto">\
            <div class="form-group">\
            <label for="cowmilkfatpercent">Cow milk fat (%) :  </label>\
            <input class="form-control" type="number" id="cowmilkfatpercent" step=0.01 name="cowmilkfatpercent"><br>\
            </div>\
            <div class="form-group">\
            <label for="buffalomilkfatpercent">Buffalo milk fat (%):  </label>\
            <input class="form-control" type="number" id="buffalomilkfatpercent" step=0.01 name="buffalomilkfatpercent"><br>\
            </div>\
            <div class="form-group">\
            <label for="driver">Driver : </label>\
            <input class="form-control" type="text" id="driver" name="driver">\
            </div>\
            <div class="form-group">\
            <label for="number">Number : </label>\
            <input class="form-control" type="number" id="number" name="number">\
            </div>\
            <button class="btn btn-dark">Submit</button>\
            </div>\
            </form>\
            </div>\
        ');



        $('#inputdetails').on('submit', function (event) {

            event.preventDefault();
            var saadhaar1 = jQuery("#saadhaar").val();
            var date1 = jQuery("#date").val();
            var time1 = jQuery("#time").val();
            var cowmilk1 = jQuery("#cowmilk").val();
            var buffalomilk1 = jQuery("#buffalomilk").val();
            var cowmilkfatpercent1 = jQuery("#cowmilkfatpercent").val();
            var buffalomilkfatpercent1 = jQuery("#buffalomilkfatpercent").val();
            var number1 = jQuery("#number").val();
            var driver1 = jQuery("#driver").val();

            console.log(number1);

            $.ajax({

                url: 'http://localhost:8081/chilling/enterdata',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ username: document.getElementById("username").innerHTML, saadhaar: saadhaar1, transacid: Math.floor((Math.random() * 100000) + 1), date: date1, time: time1, cowmilk: cowmilk1, buffalomilk: buffalomilk1, cowmilkfatpercent: cowmilkfatpercent1, buffalomilkfatpercent: buffalomilkfatpercent1, number: number1,driver: driver1}),
                success: function (response) {
                    document.getElementById("display").innerHTML += response;
                }
            });

        });


    });





});