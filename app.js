var states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];
// ==========================================================================
function dropDown() {

 for (var i = 0; i < states.length; i++) {

   var a = $('<option>');
   a.val(states[i]);
   a.attr('id', Option[i]);
   a.text(states[i]);

   a.appendTo('#states');

 };
}
dropDown();
// ============================================================================
// function sura (){

$("#button").on('click', function (e) {
 // =======================================
 e.preventDefault();
 // =======================================
 var statesResult = $('#states :selected').text();

 baseUrl = "https://developer.nps.gov/api/v1/parks?&stateCode=" + statesResult + "&limit=50&fields=addresses&api_key=5uqyHQk3MxtP8cca5E3eyQzewmpAEoinsRcBTP3o";

 $.ajax({
   url: baseUrl,
   method: "GET"
 }).then(function (response) {

   for (var j = 0; j < response.data.length; j++) {

     var result = response.data;
      console.log(response);
      console.log(response.data[j].id);
     var placeId = response.data[j].id;
     console.log(result[j]);
     console.log(result[j].addresses[0].postalCode)
     var zipCode = result[j].addresses[0].postalCode;
     var list =  $("<div class = 'container pro' id=" + placeId + ">");
     console.log("this is: " + zipCode);
     weatherCall(zipCode, placeId);

     list.html("<h2> Name: "+ result[j].fullName + "</h2>" + "<br>" + "<p> Description: " + result[j].description + "</p>" + "<br>" +"<h3> Designation: " + result[j].designation + "</h3>" + "<p> Direction: " + result[j].directionsInfo + "</p>" + "<br>");
     $("#showWeather").append(list);


   }

 })
 function weatherCall(zipCode, placeId){
   $.ajax({
       url: 'http://api.openweathermap.org/data/2.5/weather?q=' + zipCode + "&units=imperial" + "&APPID=0d662bff66bb9cd3cbf1260d8c1c69d5",
       type: "GET",
       dataType: "json",
       "placeId": placeId
     })
     .then(function(data) {
     //  console.log(placeId);
       console.log(data);
       console.log("inside weather.... placeId = " + this.placeId);
       // var weatherInfo = $("<ul>");
       // weatherInfo.attr("id", ulist);
     // listItems = $("<div class = 'container' id=" + placeId + ">");
     // listItems.html()
     //list.html("<h5> Humidity: "+ data.main.humidity + "</h5>" + "<h5> Temprature: " + data.main.temp + "</h5>" + "<br>");
     // listItems.text(response.data[j].description);
     console.log(data.main.temp);
     //return(data.main.temp);
     // listItems.append(weatherInfo);
     // $("#showWeather").append(list);

     $("#" + placeId).append("<h3><strong> Humidity:</strong> "+ data.main.humidity + "%</h3>" + "<h3><strong> Temprature:</strong> " + data.main.temp + "&deg;c</h3>" + "<h3><strong>Description:</strong><img src='http://openweathermap.org/img/w/" + data.weather[0].icon +".png'>"
     + data.weather[0].description + "</h3>" );
     })
   };


});
