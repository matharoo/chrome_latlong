//Author: Rupinder Singh Matharoo 
//Dated: January 20,2014
// This small Application uses jQuery, JSON, and Google GeoCode API to get the Address Coordinates. The query if valid returns number of results with link and coordinates. App also allows you to reverse geocode the longitude and latitude values to give you the address suggestions returned by the Google geocode API.
$(document).ready(function(){
        //hide the menu when app starts..
        $("#geocoding").hide();
        $("#reverse").hide();
        //Geocoding the addresses
        $("#getgeo").click(function(){
            $("#geo").find("tbody").remove();
            var add= $("#add").val();
            if(add==""){
                $('#geo').append('<tr><td>Please enter something!<br></td></tr>');
            }
            else{   
             $.getJSON('http://maps.google.com/maps/api/geocode/json?sensor=false&address='+add, function(jd) {
                 $("#geo").append('<tr><th>Address</th> <th>Latitude</th><th>Longitude</th></tr>'); 
                if(jd.status=="OK"){
                    for(var i=0; i<jd.results.length; i++){
                    var lat= jd.results[i].geometry.location.lat;
                    var lng= jd.results[i].geometry.location.lng;
                    var link = "http://maps.google.com/?q="+lat+","+lng;
                    $('#geo').append('<tr><td><a target="_blank" href='+link+'>' + jd.results[i].formatted_address +'</a></td>'+ 
                                     '<td>' + lat + '</td>' + 
                                     '<td>' + lng +'</td>' + 
                                     '</tr>');
                     }
                 }
                 if(jd.status=="ZERO_RESULTS"){
                        $('#geo').append('<tr><td>'+add+' not found! <br></td></tr>');
                         }
              });
            }
        });
    /*
    $("#icon").click(function(){
        console.log("hello icon click!");
        var Geo={};

        if (navigator.geolocation) {
           navigator.geolocation.getCurrentPosition(success, error);
        }

        //Getting your location coords
        function success(position) {
            Geo.lat = position.coords.latitude;
            Geo.lng = position.coords.longitude;
            console.log("latitude and longitude: "+Geo.lat+Geo.lng);
            $("#geo").append('<tr><th>My Latitude</th><th>My Longitude</th></tr>');
            $("#geo").append('<tr><td>'+Geo.lat+'</td><td>'+Geo.lng+'</td></tr>');
        }

        function error(){
            console.log("Geocoder failed");
        }
        
    });
    */
        //Reverse Geocoding
        $("#getadd").click(function(){
            $("#geo").find("tbody").remove();
            var latlng= $("#lat").val()+","+$("#lng").val();
            //console.log(latlng);
            if($("#lat").val()=="" || $("#lng").val()==""){
                $('#geo').append('<tr><td>Please enter both Latitude and Longitude values<br></td></tr>');
            }
            if($("#lat").val()!="" && $("#lng").val()!=""){
             $.getJSON('http://maps.googleapis.com/maps/api/geocode/json?sensor=false&latlng='+latlng, function(jd) {
                 $("#geo").append('<tr><th>Approx. Address</th> <th>Country</th><th>ISO Code</th></tr>'); 
                if(jd.status=="OK"){
                   // console.log(jd.results.length);
                    for(var i=0; i<jd.results.length; i++){
                    var addr= new String;
                    addr= jd.results[i].formatted_address;
                    //encoding the address value to concatenate into the link...
                    var links = "http://maps.google.com/?q="+encodeURIComponent(addr);
                    var country = "";
                    var ctrcode = "";
                        for(var j=0; j<jd.results[i].address_components.length; j++){
                            if(jd.results[i].address_components[j].types[0] =="country")
                            {
                                country = jd.results[i].address_components[j].long_name;
                                ctrcode = jd.results[i].address_components[j].short_name;
                            }   
                        }
                    $('#geo').append('<tr><td><a target="_blank" href='+links+'>' + jd.results[i].formatted_address +'</a></td>'+
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
            }
        });
        
        $("#radrev").click(function(){
            if($("#radrev").is(":checked")){
                $("#footer").hide();
                $("#geo").find("tbody").remove();
                $("#geocoding").hide(500).fadeIn;
                $("#reverse").show(500).fadeIn;
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
                console.log("pressed",e.keyCode);
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
        
    });//End of main document ready function