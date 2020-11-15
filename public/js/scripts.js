$(function(){

    $('#get-personal').on('click',function(){
        $.ajax({
            url: 'http://localhost:8081/society',
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
                        <th>aadhaarS</th>
                        <th>aadhaarC</th>
                        <th>email</th>
                        <th>basecmrate</th>
                        <th>basebmrate</th>
                        <th>doorNo</th>
                        <th>locality</th>
                        <th>pincode</th>
                    </tr>
                `);


                response.details.forEach(function(detail){
                    console.log(detail);
                    tbodyEl.append('\
                    <tr>\
                      <td class="id">' + detail.aadhaarS +'</td>\
                      <td class="id">' + detail.aadhaarC +'</td>\
                      <td class="id">' + detail.societyEmail +'</td>\
                      <td class="id">' + detail.basecmrate +'</td>\
                      <td class="id">' + detail.basebmrate +'</td>\
                      <td class="id">' + detail.doorNo +'</td>\
                      <td class="id">' + detail.locality +'</td>\
                      <td class="id">' + detail.pincode +'</td>\
                    </tr>\
                    ');
                });
            }
        });
    });

    $('#get-farmer').on('click',function(){
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





});