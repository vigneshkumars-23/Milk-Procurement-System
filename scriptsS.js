

$(function(){

        $('#get-personal').on('click',function(){
        $.ajax({
            url: 'http://localhost:8081/society',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ username: document.getElementById("username").innerHTML}),
            success: function(response){
                var temp = $('div#display');
                temp.html('');
                response.details.forEach(function(detail){
                            temp.append('\
                            <h3>Personal details</h3>\
                            <p>Society aadhaar : '+detail.aadhaarS+'<br>\
                            Chilling aadhaar : '+detail.aadhaarC+'<br>\
                            Email : '+detail.societyEmail+'<br>\
                            Cow Milk Rate   : '+detail.basecmrate+'<br>\
                            Buffalo Milk Rate: '+detail.basebmrate+'<br>\
                            Buffalo Milk Rate: '+detail.basebmrate+'<br>\
                            Door No: '+detail.doorNo+'<br>\
                            Locality: '+detail.locality+'<br>\
                            Pincode: '+detail.pincode+'</p>\
                           ');
                });
                        
                    }
                });
        });

        $('#change-pass').on('click',function(){
        
            var temp = $('div#display');
            temp.html('');
            temp.append('\
            <label for="oldpass">Old password: </label>\
            <input type="text" id="oldpass" name="oldpass"><br>\
            <label for="newpass">New password: </label>\
            <input type="text" id="newpass" name="newpass"><br>\
            <label for="confpass">Confirm password: </label>\
            <input type="text" id="confpass" name="confpass"><br>\
            <button id="change">change</button><br>\
            ');
            $('#change').on('click',function(){
                var oldpass=document.getElementById("oldpass").value;
                var newpass=document.getElementById("newpass").value;
                var confpass=document.getElementById("confpass").value;

                if(newpass!=confpass){
                    document.getElementById("display").innerHTML+="Passwords did not match";
                }
                else{

                    $.ajax({
                        url: 'http://localhost:8081/change-pass',
                        method: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify({username: document.getElementById("username").innerHTML, oldpass: oldpass,newpass: newpass}),
                            success: function(response){
                                document.getElementById("display").innerHTML+=response;
                                }
                        });
                }

                });
            });

        $('#transacDetails').on('click',function(){
        
                var temp = $('div#display');
                temp.html('');
                temp.append('\
                <form id="transacform">\
                    <label for="faadhaar">Farmer aadhaar</label>\
                    <input type="text" id="faadhaar" name="faadhaar"><br>\
                    <label for="fromdate">From :  </label>\
                    <input type="date" id="fromdate" name="fromdate"><br>\
                    <label for="todate">To :  </label>\
                    <input type="date" id="todate" name="todate"><br>\
                    <button>submit</button><br>\
                </form>\
                ');

                $('#transacform').on('submit',function(event){
                    event.preventDefault();
                    var aadhaar=jQuery("#faadhaar").val();
                    var fdate=jQuery("#fromdate").val();
                    var tdate=jQuery("#todate").val();

                    $.ajax({
                        url: 'http://localhost:8081/farmertransac',
                        method: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify({username: document.getElementById("username").innerHTML,aadhaar: aadhaar,fdate: fdate,tdate: tdate}),
                            success: function(response){

                                var tbodyEl = $('tbody');
                                var theadEl = $('thead');

                                theadEl.html('');
                                tbodyEl.html('');

                                theadEl.append(`
                                    <tr>
                                        <th>TransacId</th>
                                        <th>Date</th>
                                        <th>Time</th>
                                        <th>Society Aaadhaar</th>
                                        <th>Farmer Aadhaar</th>
                                        <th>Cow Milk Quantity</th>
                                        <th>Buffalo Milk Quatity</th>
                                        <th>BMFatPercent</th>
                                        <th>CMFatPercent</th>
                                    </tr>
                                `);


                                response.details.forEach(function(detail){
                                    console.log(detail);
                                    tbodyEl.append('\
                                    <tr>\
                                    <td class="id">' + detail.transacId +'</td>\
                                    <td class="id">' + detail.date +'</td>\
                                    <td class="id">' + detail.time +'</td>\
                                    <td class="id">' + detail.aadhaar1 +'</td>\
                                    <td class="id">' + detail.aadhaar2 +'</td>\
                                    <td class="id">' + detail.cowMilk +'</td>\
                                    <td class="id">' + detail.buffaloMilk +'</td>\
                                    <td class="id">' + detail.BMFatPercent +'</td>\
                                    <td class="id">' + detail.CMFatPercent +'</td>\
                                    </tr>\
                                    ');
                                });
                            }
                                   
                                
                        });
                    
                });
                
            });



            $('#ownrecords').on('click',function(){
        
                var temp = $('div#display');
                temp.html('');
                temp.append('\
                <form id="transacform">\
                    <label for="fromdate">From :  </label>\
                    <input type="date" id="fromdate" name="fromdate"><br>\
                    <label for="todate">To :  </label>\
                    <input type="date" id="todate" name="todate"><br>\
                    <button>submit</button><br>\
                </form>\
                ');

                    $('#transacform').on('submit',function(event){
                    event.preventDefault();
                    var fdate=jQuery("#fromdate").val();
                    var tdate=jQuery("#todate").val();

                    $.ajax({
                        url: 'http://localhost:8081/ownrecords',
                        method: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify({username: document.getElementById("username").innerHTML,fdate: fdate,tdate: tdate}),
                            success: function(response){

                                var tbodyEl = $('tbody');
                                var theadEl = $('thead');

                                theadEl.html('');
                                tbodyEl.html('');

                                theadEl.append(`
                                    <tr>
                                        <th>TransacId</th>
                                        <th>Date</th>
                                        <th>Time</th>
                                        <th>Society Aaadhaar</th>
                                        <th>Chilling Aadhaar</th>
                                        <th>Cow Milk Quantity</th>
                                        <th>Buffalo Milk Quatity</th>
                                        <th>BMFatPercent</th>
                                        <th>CMFatPercent</th>
                                    </tr>
                                `);


                                response.details.forEach(function(detail){
                                    console.log(detail);
                                    tbodyEl.append('\
                                    <tr>\
                                    <td class="id">' + detail.transacId +'</td>\
                                    <td class="id">' + detail.date +'</td>\
                                    <td class="id">' + detail.time +'</td>\
                                    <td class="id">' + detail.aadhaar1 +'</td>\
                                    <td class="id">' + detail.aadhaar2 +'</td>\
                                    <td class="id">' + detail.cowMilk +'</td>\
                                    <td class="id">' + detail.buffaloMilk +'</td>\
                                    <td class="id">' + detail.BMFatPercent +'</td>\
                                    <td class="id">' + detail.CMFatPercent +'</td>\
                                    </tr>\
                                    ');
                                });
                            }
                                   
                                
                        });
                    
                });
                
                
            });












        

        $('#get-farmer').on('click',function(event){
            $.ajax({
                url: 'http://localhost:8081/farmer',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ username: document.getElementById("username").innerHTML}),
                success: function(response){
                    var tbodyEl = $('tbody');
                    var theadEl = $('thead');

                    theadEl.html('');
                    tbodyEl.html('');

                    theadEl.append(`
                        <tr>
                            <th>farmers</th>
                        </tr>
                    `);


                    response.details.forEach(function(detail){
                        console.log(detail);
                        tbodyEl.append('\
                        <tr>\
                        <td class="id">' + detail.farmerEmail +'</td>\
                        </tr>\
                        ');
                    });
                }
            });
        });

        $('#enterdata').on('click',function(event){

            event.preventDefault();
        
            var temp = $('div#display');
            temp.html('');
            temp.append('\
            <form id="inputdetails">\
            <label for="faadhaar">Farmer aadhaar</label>\
            <input type="text" id="faadhaar" name="faadhaar"><br>\
            <label for="date">Date</label>\
            <input type="date" id="date" name="date"><br>\
            <label for="time">time</label>\
            <input type="time" id="time" name="time"><br>\
            <label for="cowmilk">cow milk :  </label>\
            <input type="number" id="cowmilk" step=0.01 name="cowmilk"><br>\
            <label for="buffalomilk">Buffalo milk :  </label>\
            <input type="number" id="buffalomilk" step=0.01 name="buffalomilk"><br>\
            <label for="cowmilkfatpercent">cow milk fat percent :  </label>\
            <input type="number" id="cowmilkfatpercent" step=0.01 name="cowmilkfatpercent"><br>\
            <label for="buffalomilkfatpercent">Buffalo milk percent:  </label>\
            <input type="number" id="buffalomilkfatpercent" step=0.01 name="buffalomilkfatpercent"><br>\
            <button>submit</button><br>\
            </form>\
            ');

 

                $('#inputdetails').on('submit',function(event){
                    event.preventDefault();
                    var faadhaar1=jQuery("#faadhaar").val();
                    var date1=jQuery("#date").val();
                    var time1=jQuery("#time").val();
                    var cowmilk1=jQuery("#cowmilk").val();
                    var buffalomilk1=jQuery("#buffalomilk").val();
                    var cowmilkfatpercent1=jQuery("#cowmilkfatpercent").val();
                    var buffalomilkfatpercent1=jQuery("#buffalomilkfatpercent").val();
                    $.ajax({
                        
                        url: 'http://localhost:8081/enterdata',
                        method: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify({ username: document.getElementById("username").innerHTML,faadhaar: faadhaar1,transacid: Math.floor((Math.random()*100000)+1),date: date1,time: time1, cowmilk: cowmilk1,buffalomilk: buffalomilk1,cowmilkfatpercent: cowmilkfatpercent1,buffalomilkfatpercent: buffalomilkfatpercent1}),
                        success: function(response){
                            document.getElementById("display").innerHTML+="successfully inserted";
                        }
                    });

                });


             });





});