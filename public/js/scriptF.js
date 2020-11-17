$(function () {

    $('#get-me').on('click', function () {

        console.log(document.getElementById("username").innerHTML);
        $.ajax({
            url: 'http://localhost:8081/farmer/mydetails',
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

                
                    temp1.append('\
                            <div class="card m-auto pl-2 border-bottom-0">\
                            <div class="card-body">\
                            <h3 class="card-title"><b>Personal details</b></h3>\
                            <p class="card-text text-dark font-weight-bold">\
                            First Name : '+ response.details[0].firstName + '<br>\
                            Last Name : '+ response.details[0].lastName + '<br>\
                            Aadhar ID : '+ response.details[0].aadhaarF + '<br>\
                            Gender   : '+ response.details[0].gender + '<br>\
                            Date of Birth : '+ response.details[0].DoB + '<br>\
                            Phone NO: '+ response.details[0].phoneNo+'</p><br>\
                            </div></div>\
                            ');


                            temp1.append('\
                            <div class="card m-auto pl-2">\
                            <div class="card-body">\
                            <h3 class="card-title"><b>My Address</b></h3>\
                            <p class="card-text text-dark font-weight-bold">Door No. : '+ response.details[0].doorNo + '<br>\
                            Locality : '+ response.details[0].locality + '<br>\
                            City : '+ response.details[0].city + '<br>\
                            Pincode   : '+ response.details[0].pincode + '<br>\
                            </p>\
                            </div >\
                            </div >\
                        ');
                
            }
        });
    });

    $('#get-account').on('click', function () {
        $.ajax({
            url: 'http://localhost:8081/farmer/myaccount',
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


    $('#get-society').on('click', function () {
        $.ajax({
            url: 'http://localhost:8081/farmer/mysociety',
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
                            <h3 class="card-title"><b>Address</b></h3>\
                            <p class="card-text text-dark font-weight-bold">Door No. : '+ detail.doorNo + '<br>\
                            Locality : '+ detail.locality + '<br>\
                            City : '+ detail.city + '<br>\
                            Pincode   : '+ detail.pincode + '</p>\
                            </div></div>\
                            <div class="card">\
                            <div class="card-body">\
                            <h3 class="card-title"><b>Billing System</b></h3>\
                            <p class="card-text text-dark font-weight-bold">Cow Milk Rate : '+ detail.basecmrate + '.Rs per Kg of Fat <br>\
                            Buffalo Milk Rate : '+ detail.basebmrate + '.Rs per Kg of Fat </p>\
                            </div></div>\
                            <div class="card">\
                            <div class="card-body">\
                            <h3 class="card-title"><b>Contact Details</b></h3>\
                            <p class="card-text text-dark font-weight-bold">Phone No. : '+ detail.phoneNo + '</p><br>\
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
                url: 'http://localhost:8081/farmer/fetchfarmer',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ username: document.getElementById("username").innerHTML, fromdate: fdate, todate: tdate }),
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


                        response.details.forEach(function (value) {
                            tbodyEl.append('\
                                    <tr>\
                                    <td class="id">' + value.transacId + '</td>\
                                    <td class="id">' + value.date + '</td>\
                                    <td class="id">' + value.time + '</td>\
                                    <td class="id">' + value.farmerEmail + '</td>\
                                    <td class="id">' + value.societyEmail + '</td>\
                                    <td class="id">' + value.cowMilk + ' L</td>\
                                    <td class="id">' + value.CMFatPercent + ' %</td>\
                                    <td class="id">' + value.amount1 + ' . Rs</td>\
                                    <td class="id">' + value.buffaloMilk + ' L</td>\
                                    <td class="id">' + value.BMFatPercent + ' %</td>\
                                    <td class="id">' + value.amount2 + ' . Rs</td>\
                                    <td class="id">' + value.total + ' . Rs</td>\
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
                    url: 'http://localhost:8081/farmer/changepass',
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