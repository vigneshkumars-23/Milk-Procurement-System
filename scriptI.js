$(function () {

    $('#change-pass').on('click', function () {

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
                    url: 'http://localhost:8081/industry/change-pass',
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



    $('#get-personal').on('click', function () {
        $.ajax({
            url: 'http://localhost:8081/industry/get-personal',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ username: document.getElementById("username").innerHTML }),
            success: function (response) {
                var temp = $('div#display');
                temp.html('');
                response.details.forEach(function (detail) {
                    temp.append('\
                            <div class="card m-auto pl-2 border-bottom-0">\
                            <div class="card-body">\
                            <h3 class="card-title"><b>Personal details</b></h3>\
                            <p class="card-text text-dark font-weight-bold">\
                            Industry aadhaar : '+ detail.aadhaarI + '<br>\
                            Email : '+ detail.industryEmail + '<br>\
                            Cow Milk Rate   : '+ detail.basecmrate + '<br>\
                            Buffalo Milk Rate: '+ detail.basebmrate + '<br>\
                            Door No: '+ detail.doorNo + '<br>\
                            Locality: '+ detail.locality + '<br>\
                            Pincode: '+ detail.pincode + '</p>\
                            </div >\
                            </div >\
                           ');
                });

            }
        });
    });

    $('#get-chilling').on('click', function (event) {
        $.ajax({
            url: 'http://localhost:8081/industry/chilling',
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
                            <th>chilling</th>
                        </tr>
                    `);


                response.details.forEach(function (detail) {
                    console.log(detail);
                    tbodyEl.append('\
                        <tr>\
                        <td class="id">' + detail.chillingEmail + '</td>\
                        </tr>\
                        ');
                });
            }
        });
    });


    $('#transacDetails').on('click', function () {

        var temp = $('div#display');
        temp.html('');
        temp.append('\
        <div class="container pt-3">\
            <form id="transacform">\
                <div class="form-group">\
                <label for="caadhaar">Chilling System aadhaar</label>\
                <input type="text" id="caadhaar" name="caadhaar"><br>\
                </div>\
                <div class="form-group">\
                <label for="fromdate">From :  </label>\
                <input type="date" id="fromdate" name="fromdate"><br>\
                </div>\
                <div class="form-group">\
                <label for="todate">To :  </label>\
                <input type="date" id="todate" name="todate"><br>\
                </div>\
                <button class="btn btn-dark">Submit</button><br>\
            </form>\
            </div>\
            ');

        $('#transacform').on('submit', function (event) {
            event.preventDefault();
            var aadhaar = jQuery("#caadhaar").val();
            var fdate = jQuery("#fromdate").val();
            var tdate = jQuery("#todate").val();

            $.ajax({
                url: 'http://localhost:8081/industry/chillingtransac',
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
                                    <th>TransacId</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Chilling Aaadhaar</th>
                                    <th>Industry Aadhaar</th>
                                    <th>Cow Milk Quantity</th>
                                    <th>Buffalo Milk Quatity</th>
                                    <th>BMFatPercent</th>
                                    <th>CMFatPercent</th>
                                </tr>
                            `);


                    response.details.forEach(function (detail) {
                        console.log(detail);
                        tbodyEl.append('\
                                <tr>\
                                <td class="id">' + detail.transacId + '</td>\
                                <td class="id">' + detail.date + '</td>\
                                <td class="id">' + detail.time + '</td>\
                                <td class="id">' + detail.aadhaar1 + '</td>\
                                <td class="id">' + detail.aadhaar2 + '</td>\
                                <td class="id">' + detail.cowMilk + '</td>\
                                <td class="id">' + detail.buffaloMilk + '</td>\
                                <td class="id">' + detail.BMFatPercent + '</td>\
                                <td class="id">' + detail.CMFatPercent + '</td>\
                                </tr>\
                                ');
                    });
                }


            });

        });

    });


    $('#enterdata').on('click', function (event) {

        event.preventDefault();

        var temp = $('div#display');
        temp.html('');
        temp.append('\
            <div class="container pt-3 clearfix">\
            <form id="inputdetails">\
            <div class="container pt-3 clearfix">\
            <div class="form-group">\
            <label for="caadhaar">Chilling aadhaar</label>\
            <input type="text" id="caadhaar" name="caadhaar"><br>\
            </div>\
            <div class="form-group">\
            <label for="date">Date</label>\
            <input type="date" id="date" name="date"><br>\
            </div>\
            <div class="form-group">\
            <label for="time">Time</label>\
            <input type="time" id="time" name="time"><br>\
            </div>\
            <div class="form-group">\
            <label for="cowmilk">Cow milk (litres):  </label>\
            <input type="number" id="cowmilk" step=0.01 name="cowmilk"><br>\
            </div>\
            </div>\
            <div class="float-right m-1 w-auto">\
            <div class="form-group">\
            <label for="buffalomilk">Buffalo milk (litres):  </label>\
            <input type="number" id="buffalomilk" step=0.01 name="buffalomilk"><br>\
            </div>\
            <div class="form-group">\
            <label for="cowmilkfatpercent">Cow milk fat (%) :  </label>\
            <input type="number" id="cowmilkfatpercent" step=0.01 name="cowmilkfatpercent"><br>\
            </div>\
            <div class="form-group">\
            <label for="buffalomilkfatpercent">Buffalo milk fat (%):  </label>\
            <input type="number" id="buffalomilkfatpercent" step=0.01 name="buffalomilkfatpercent"><br>\
            </div>\
            <button class="btn btn-dark">submit</button>\
            </div>\
            </form>\
            >/div>\
            ');



        $('#inputdetails').on('submit', function (event) {
            event.preventDefault();
            var caadhaar1 = jQuery("#caadhaar").val();
            var date1 = jQuery("#date").val();
            var time1 = jQuery("#time").val();
            var cowmilk1 = jQuery("#cowmilk").val();
            var buffalomilk1 = jQuery("#buffalomilk").val();
            var cowmilkfatpercent1 = jQuery("#cowmilkfatpercent").val();
            var buffalomilkfatpercent1 = jQuery("#buffalomilkfatpercent").val();
            $.ajax({

                url: 'http://localhost:8081/enterdata',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ username: document.getElementById("username").innerHTML, caadhaar: caadhaar1, transacid: Math.floor((Math.random() * 100000) + 1), date: date1, time: time1, cowmilk: cowmilk1, buffalomilk: buffalomilk1, cowmilkfatpercent: cowmilkfatpercent1, buffalomilkfatpercent: buffalomilkfatpercent1 }),
                success: function (response) {
                    document.getElementById("display").innerHTML += "Successfully inserted";
                }
            });

        });


    });


});