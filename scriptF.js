$(function () {

    $('#get-me').on('click', function () {

        console.log(document.getElementById("username").innerHTML);
        $.ajax({
            url: 'http://localhost:8081/mydetails',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ username: document.getElementById("username").innerHTML }),
            success: function (response) {
                var temp1 = $('div#details');
                var temp2 = $('div#display');
                var tbodyEl = $('tbody');
                var theadEl = $('thead');
                temp1.html('');
                temp2.html('');
                theadEl.html('');
                tbodyEl.html('');

                /*SimpleDateFormat inputFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
                SimpleDateFormat outputFormat = new SimpleDateFormat("dd-MM-yyyy");
                Date date = inputFormat.parse("2018-04-10T04:00:00.000Z");
                String formattedDate = outputFormat.format(date);*/
                //System.out.println(formattedDate);

                response.details.forEach(function (detail) {
                    temp1.append('\
                            <div class="card m-auto pl-2 border-bottom-0">\
                            <div class="card-body">\
                            <h3 class="card-title"><b>Personal details</b></h3>\
                            <p class="card-text text-dark font-weight-bold">\
                            First Name : '+ detail.firstName + '<br>\
                            Last Name : '+ detail.lastName + '<br>\
                            Aadhar ID : '+ detail.aadhaarF + '<br>\
                            Gender   : '+ detail.gender + '<br>\
                            Date of Birth : '+ detail.DoB + '</p><br>\
                            </div></div>\
                            <div class="card m-auto pl-2">\
                            <div class="card-body">\
                            <h3 class="card-title"><b>My Address</b></h3>\
                            <p class="card-text text-dark font-weight-bold">Door No. : '+ detail.doorNo + '<br>\
                            Locality : '+ detail.locality + '<br>\
                            City : '+ detail.city + '<br>\
                            Pincode   : '+ detail.pincode + '<br>\
                            </p>\
                            </div >\
                            </div >\
                        ');
                });
            }
        });
    });

    $('#get-account').on('click', function () {
        $.ajax({
            url: 'http://localhost:8081/myaccount',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ username: document.getElementById("username").innerHTML }),
            success: function (response) {
                console.log(response);
                var temp1 = $('div#details');
                var temp2 = $('div#display');
                var tbodyEl = $('tbody');
                var theadEl = $('thead');
                temp1.html('');
                temp2.html('');
                theadEl.html('');
                tbodyEl.html('');
                response.details.forEach(function (detail) {
                    temp1.append('\
                            <div class="card">\
                            <div class="card-body">\
                            <h3 class="card-title"><b>My Account Details</b></h3>\
                            <p class="card-text text-dark font-weight-bold">Role : '+ detail.role + '<br>\
                            Username : '+ detail.email + '<br>\
                            Password : '+ detail.password + '<br>\
                            </p>\
                            </div></div>\
                           ');
                });
            }
        });
    });

    $('#get-contact').on('click', function () {
        $.ajax({
            url: 'http://localhost:8081/mycontact',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ username: document.getElementById("username").innerHTML }),
            success: function (response) {
                console.log(response);
                var temp1 = $('div#details');
                var temp2 = $('div#display');
                var tbodyEl = $('tbody');
                var theadEl = $('thead');
                temp1.html('');
                temp2.html('');
                theadEl.html('');
                tbodyEl.html('');
                response.details.forEach(function (detail) {
                    temp1.append('\
                            <div class="card m-auto pl-2">\
                            <div class="card-body">\
                            <h3 class="card-title"><b>My Contact</b></h3>\
                            <p class="card-text text-dark font-weight-bold">Email ID : '+ detail.farmerEmail + '<br>\
                            Phone No. : '+ detail.phoneNo + '<br>\
                            </p>\
                            </div></div>\
                           ');
                });
            }
        });
    });

    $('#get-society').on('click', function () {
        $.ajax({
            url: 'http://localhost:8081/mysociety',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ username: document.getElementById("username").innerHTML }),
            success: function (response) {
                console.log(response);
                var temp1 = $('div#details');
                var temp2 = $('div#display');
                var tbodyEl = $('tbody');
                var theadEl = $('thead');
                temp1.html('');
                temp2.html('');
                theadEl.html('');
                tbodyEl.html('');
                response.details.forEach(function (detail) {
                    temp1.append('\
                            <div class="card">\
                            <div class="card-body">\
                            <h3 class="card-title"><b>My Society Detail</b></h3>\
                            <p class="card-text text-dark font-weight-bold">Aadhaar ID : '+ detail.aadhaarS + '<br>\
                            Email ID : '+ detail.societyEmail + '<p>\
                            </div></div>\
                            <div class="card">\
                            <div class="card-body">\
                            <h3><b>Address</b></h3>\
                            <p>Door No. : '+ detail.doorNo + '<br>\
                            Locality : '+ detail.locality + '<br>\
                            City : '+ detail.city + '<br>\
                            Pincode   : '+ detail.pincode + '</p>\
                            </div></div>\
                            <div class="card">\
                            <div class="card-body">\
                            <h3><b>Billing System</b></h3>\
                            <p>Cow Milk Rate : '+ detail.basecmrate + '.Rs per litre <br>\
                            Buffalo Milk Rate : '+ detail.basebmrate + '.Rs per litre </p>\
                            <h3><b>Contact Details</b></h3>\
                            <p>Phone No. : '+ detail.phoneNo + '</p><br>\
                            </div></div>\
                           ');
                });
            }
        });
    });
    //new aksjbfaljcbalcbalbcjvalcblqkc
    $('#transac').on('click', function () {

        var temp1 = $('div#details');
        var temp2 = $('div#display');
        var tbodyEl = $('tbody');
        var theadEl = $('thead');
        temp1.html('');
        temp2.html('');
        theadEl.html('');
        tbodyEl.html('');
        temp2.append('\
            <div class="container pt-3">\
            <form id="transacform">\
                <div class="form-group">\
                <label for="adr">Society Email </label>\
                <input class="form-control" type="text" name="adr" id="adr" placeholder="Enter Society Email"/>\
                </div>\
                <div class="form-group">\
                <label for="fromdate">From  </label>\
                <input class="form-control" type="date" name="fromdate" id="fromdate">\
                </div>\
                <div class="form-group">\
                <label for="todate">To  </label>\
                <input class="form-control" type="date" name="todate" id="todate" />\
                </div>\
                <button class="btn btn-dark" id="fetch">Fetch data</button><br>\
            </form>\
            </div>\
            ');

        $('#transacform').on('submit', function (event) {
            console.log("hi");
            event.preventDefault();
            var mailS = jQuery("#adr").val();
            var fdate = jQuery("#fromdate").val();
            var tdate = jQuery("#todate").val();
            //console.log(fdate);
            //console.log(tdate);
            /*var fromdate = fdate.split("-").reverse().join("-");
            var todate = tdate.split("-").reverse().join("-");
            console.log(fromdate);
            console.log(todate);*/

            $.ajax({
                url: 'http://localhost:8081/fetchfarmer',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ username: document.getElementById("username").innerHTML, mailS: mailS, fromdate: fdate, todate: tdate }),
                success: function (response) {
                    //console.log(response);
                    var temp1 = $('div#details');
                    //var temp2 = $('div#display');
                    var tbodyEl = $('tbody');
                    var theadEl = $('thead');
                    temp1.html('');
                    //temp2.html('');
                    theadEl.html('');
                    tbodyEl.html('');

                    if (response.details == "False1") {
                        temp1.append(`\
                            <p>Entered Society Email is not found</p>\
                        `);
                    }
                    else if (response.details == "False2") {
                        temp1.append(`\
                            <p>No transactions were taken place in the entered date intervals</p>\
                        `);
                    }
                    else if (response.details == "False3") {
                        temp1.append(`\
                            <p>Entered Society Email may be incorrect<br>\
                                               <b>OR</b><br>\
                            No transactions were taken place with the entered Society in the given date intervals</p>\
                        `);
                    }
                    else {
                        theadEl.append(`
                        <tr>
                            <th>Transaction ID</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Farmer Email</th>
                            <th>Farmer Aadhaar</th>
                            <th>Society Email</th>
                            <th>Society Aadhaar</th>
                            <th>Cow Milk (litres)</th>
                            <th>Cow Milk Fat (%)</th>
                            <th>Amount-1</th>
                            <th>Buffalo Milk (litres)</th>
                            <th>Buffalo Milk Fat (%)</th>
                            <th>Amount-2</th>
                            <th>Total</th>
                        </tr>
                    `);


                        response.details.forEach(function (value) {
                            console.log(value);
                            var amt1 = ((value.basecmrate) - (value.CMFatPercent)) * (value.cowMilk);
                            var amt2 = ((value.basebmrate) - (value.BMFatPercent)) * (value.buffaloMilk);
                            tbodyEl.append('\
                                    <tr>\
                                    <td class="id">' + value.transacId + '</td>\
                                    <td class="id">' + value.date + '</td>\
                                    <td class="id">' + value.time + '</td>\
                                    <td class="id">' + value.farmerEmail + '</td>\
                                    <td class="id">' + value.aadhaar1 + '</td>\
                                    <td class="id">' + value.societyEmail + '</td>\
                                    <td class="id">' + value.aadhaar2 + '</td>\
                                    <td class="id">' + value.cowMilk + ' L</td>\
                                    <td class="id">' + value.CMFatPercent + ' %</td>\
                                    <td class="id">' + amt1 + ' . Rs</td>\
                                    <td class="id">' + value.buffaloMilk + ' L</td>\
                                    <td class="id">' + value.BMFatPercent + ' %</td>\
                                    <td class="id">' + amt2 + ' . Rs</td>\
                                    <td class="id">' + (amt1 + amt2) + ' . Rs</td>\
                                    </tr>\
                        ');
                        });
                    }
                }
            });
        });
    });
    //password change
    $('#changep').on('click', function () {
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
        <div class="limiter">\
        <div class="container-login100>\
        <div class="wrap-login100>\
        <form class="login100-form validate-form align-center">\
        <span class="login100-form-title p-b-26">\
        Password Change\
        </span>\
        <div class="form-group wrap-input100 validate-input">\
        <label for="oldpass">Current password </label>\
        <span class="btn-show-pass">\
            <i class="zmdi zmdi-eye m-t-5" onclick=myFunction1() ></i>\
        </span>\
        <input class="input100" type="password" id="oldpass" name="oldpass">\
        <span class="focus-input100"></span>
        </div>\
        <div class="form-group wrap-input100 validate-input">\
        <label for="newpass">New password </label>\
        <span class="btn-show-pass">\
            <i class="zmdi zmdi-eye m-t-5" onclick=myFunction2() ></i>\
        </span>\
        <input class="input100" type="password" id="newpass" name="newpass">\
        <span class="focus-input100"></span>
        </div>\
        <div class="form-group wrap-input100 validate-input">\
        <label for="confpass">Confirm password </label>\
        <span class="btn-show-pass">\
            <i class="zmdi zmdi-eye m-t-5" onclick=myFunction3() ></i>\
        </span>\
        <input class="input100" type="password" id="confpass" name="confpass">\
        <span class="focus-input100"></span>
        </div>\
        <div class="container-login100-form-btn">\
            <div class="wrap-login100-form-btn">\
                <div class="login100-form-bgbtn"></div>\
                    <button class="login100-form-btn" id="change">\
                        Change\
                    </button>\
            </div>\
        </div>\
        </form>\
        </div>\
        </div>\
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
                    url: 'http://localhost:8081/changepass',
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
                        document.getElementById("details").innerHTML += response;
                    }
                });
            }
        });
    });
});