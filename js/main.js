//Author: Rupinder Singh Matharoo
//Dated: January 20,2014
// This small Application uses jQuery, JSON, and Google GeoCode API to get the Address Coordinates. The query if valid returns number of results with link and coordinates. App also allows you to reverse geocode the longitude and latitude values to give you the address suggestions returned by the Google geocode API.
$(document).ready(function(){
        //hide the menu when app starts..
        $("#geocoding").hide();
        $("#exportcoords").hide();
        $("#exportaddr").hide();
        $("#reverse").hide();
        var geotype ="";
        //Geocoding the addresses
        $("#getgeo").click(function(){
            geotype="GeoCoordinates";
            $("#geo").find("tbody").remove();
            var add= $("#add").val();
            if(add==""){
                $('#geo').append('<tr><td>Please enter something!<br></td></tr>');
            }
            else{
             $.getJSON('http://open.mapquestapi.com/geocoding/v1/address?key=Sf1M5KMV6oofg1zYOG0A2AQkWy8ExwkF&location='+add, function(jd) {
                 $("#geo").append('<tr><th>Address</th> <th>Latitude</th><th>Longitude</th></tr>');
                if(jd.info.statuscode==0 && jd.results[0].locations.length>0){
                  $("#exportcoords").show();
                    for(var i=0; i<jd.results[0].locations.length; i++){
                    var lat= jd.results[0].locations[i].latLng.lat;
                    var lng= jd.results[0].locations[i].latLng.lng;
                    var linkText = "";
                    if(jd.results[0].locations[i].adminArea6!=undefined){
                      linkText += jd.results[0].locations[i].adminArea6+" ";
                    }
                    if(jd.results[0].locations[i].adminArea5!=undefined){
                      linkText += jd.results[0].locations[i].adminArea5+" ";
                    }
                    if(jd.results[0].locations[i].adminArea4!=undefined){
                      linkText += jd.results[0].locations[i].adminArea4+" ";
                    }
                    if(jd.results[0].locations[i].adminArea3!=undefined){
                      linkText += jd.results[0].locations[i].adminArea3+" ";
                    }
                    if(jd.results[0].locations[i].adminArea2!=undefined){
                      linkText += jd.results[0].locations[i].adminArea2+" ";
                    }
                    if(jd.results[0].locations[i].adminArea1!=undefined){
                      linkText += jd.results[0].locations[i].adminArea1+" ";
                    }
                    $('#geo').append('<tr><td><a target="_blank" href='+jd.results[0].locations[i].mapUrl+'>' + linkText +'</a></td>'+
                                     '<td><p>' + lat + '</p></td>' +
                                     '<td>' + lng +'</td>' +
                                     '</tr>');
                     }
                 }
                 else{
                        $('#geo').append('<tr><td>'+add+' not found! <br></td></tr>');
                         }
              });
            }
        });

        //Reverse Geocoding
        $("#getadd").click(function(){
          geotype="ReverseGeoAddresses";
            $("#geo").find("tbody").remove();
            var latlng= $("#lat").val()+","+$("#lng").val();
            //console.log(latlng);
            if($("#lat").val()=="" || $("#lng").val()==""){
                $('#geo').append('<tr><td>Please enter both Latitude and Longitude values<br></td></tr>');
            }
            if($("#lat").val()!="" && $("#lng").val()!=""){
             $.getJSON('http://www.mapquestapi.com/geocoding/v1/reverse?key=Sf1M5KMV6oofg1zYOG0A2AQkWy8ExwkF&location='+$("#lat").val()+','+$("#lng").val()+'&includeRoadMetadata=true&includeNearestIntersection=true', function(jd) {
                 $("#geo").append('<tr><th>Approx. Address</th> <th>Country</th><th>State/Province</th></tr>');
                if(jd.info.statuscode==0 && jd.results[0].locations.length>0){
                    $("#exportaddr").show();
                   // console.log(jd.results.length);
                    for(var i=0; i<jd.results[0].locations.length; i++){
                    var addr = "";
                    if(jd.results[0].locations[i].street!=undefined){
                      addr += jd.results[0].locations[i].street+" ";
                    }
                    if(jd.results[0].locations[i].adminArea6!=undefined){
                      addr += jd.results[0].locations[i].adminArea6+" ";
                    }
                    if(jd.results[0].locations[i].adminArea5!=undefined){
                      addr += jd.results[0].locations[i].adminArea5+" ";
                    }
                    if(jd.results[0].locations[i].adminArea4!=undefined){
                      addr += jd.results[0].locations[i].adminArea4+" ";
                    }
                    if(jd.results[0].locations[i].adminArea3!=undefined){
                      addr += jd.results[0].locations[i].adminArea3+" ";
                    }
                    if(jd.results[0].locations[i].adminArea2!=undefined){
                      addr += jd.results[0].locations[i].adminArea2+" ";
                    }
                    if(jd.results[0].locations[i].adminArea1!=undefined){
                      addr += jd.results[0].locations[i].adminArea1+" ";
                    }
                    //encoding the address value to concatenate into the link...
                    var links = jd.results[0].locations[i].mapUrl;
                    var country = jd.results[0].locations[i].adminArea1;
                    var ctrcode = jd.results[0].locations[i].adminArea3;
                    $('#geo').append('<tr><td><a target="_blank" href='+links+'>' + addr +'</a></td>'+
                                     '<td>' + country + '</td>' +
                                     '<td>'+ ctrcode + '</td>' +
                                     '</tr>');
                     }
                 }
                 if(jd.status=="ZERO_RESULTS"){
                        $('#geo').append('<tr><td>Address not found! <br></td></tr>');
                         }
              });
            }
        });
        $("#clear1").click(function(){
            $("#geo").find("tbody").remove();
        });

        $("#clear2").click(function(){
            $("#geo").find("tbody").remove();
            $("#lat").val('');
            $("#lng").val('');
        });

        $("#radgeo").click(function(){
            if($("#radgeo").is(":checked")){
                $("#footer").hide();
                $("#geo").find("tbody").remove();
                $("#geocoding").show(500).fadeIn;
                $("#reverse").hide(500).fadeIn;
                $("#exportaddr").hide();
                $("#exportcoords").hide();
            }
        });

        $("#radrev").click(function(){
            if($("#radrev").is(":checked")){
                $("#footer").hide();
                $("#geo").find("tbody").remove();
                $("#geocoding").hide(500).fadeIn;
                $("#reverse").show(500).fadeIn;
                $("#exportaddr").hide();
                $("#exportcoords").hide();
            }
        });

        $("#lat,#lng").keydown(function (e) {
            // Allow: backspace, delete, tab, escape, enter and .
            if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190, 189, 45]) !== -1 ||
                 // Allow: Ctrl+A
                (e.keyCode == 65 && e.ctrlKey === true) ||
                 // Allow: home, end, left, right
                (e.keyCode >= 35 && e.keyCode <= 39)) {
                     // let it happen, don't do anything
                //console.log("pressed",e.keyCode);
                     return;
            }
            // Ensure that it is a number and stop the keypress
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            }
        });
        $("#add").keyup(function(event){
            if(event.keyCode == 13){
                $("#getgeo").click();
            }
        });

    $('#exportcoords, #exportaddr').click(function() {
          var titles = [];
          var data = [];
          //getting table headers
          $('.dataTable th').each(function() {
            titles.push($(this).text());
          });
          //getting table data
          $('.dataTable td').each(function() {
            data.push($(this).text());
          });
          //csv conversion
          var CSVString = prepCSVRow(titles, titles.length, '');
          CSVString = prepCSVRow(data, titles.length, CSVString);
          //downloading csv
          var downloadLink = document.createElement("a");
          var blob = new Blob(["\ufeff", CSVString]);
          var url = URL.createObjectURL(blob);
          downloadLink.href = url;
          downloadLink.download = "LatLong-"+geotype+"-"+getFormattedTime()+".csv";

          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
        });


            function prepCSVRow(arr, columnCount, initial) {
              var row = '';
              var delimeter = ','; // data slice separator, in excel it's `;`, in usual CSv it's `,`
              var newLine = '\r\n'; // newline separator for CSV row

              function splitArray(_arr, _count) {
                var splitted = [];
                var result = [];
                _arr.forEach(function(item, idx) {
                  if ((idx + 1) % _count === 0) {
                    splitted.push(item);
                    result.push(splitted);
                    splitted = [];
                  } else {
                    splitted.push(item);
                  }
                });
                return result;
              }
              var plainArr = splitArray(arr, columnCount);
              plainArr.forEach(function(arrItem) {
                arrItem.forEach(function(item, idx) {
                  row += item + ((idx + 1) === arrItem.length ? '' : delimeter);
                });
                row += newLine;
              });
              return initial + row;
            }

            function getFormattedTime() {
              var today = new Date();
              var y = today.getFullYear();
              // JavaScript months are 0-based.
              var m = today.getMonth() + 1;
              var d = today.getDate();
              var h = today.getHours();
              var mi = today.getMinutes();
              var s = today.getSeconds();
              return y + "-" + m + "-" + d + "-" + h + "-" + mi + "-" + s;
          }
    });//End of main document ready function
