var states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];
// ==========================================================================
//  function sura(){
//   alert('hello');
// }
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
      //  console.log(response);
      
      console.log(result[j]);
      console.log(result[j].addresses[0].postalCode)
      var zipCode = result[j].addresses[0].postalCode;
      var list = $("<div class = 'container'>");
      list.html("<p> Name: " + result[j].fullName + "</p>" + "<br>" + "<p> Description: " + result[j].description + "</p>" + "<br>" +"<p> Designation: " + result[j].designation + "</p>" + "<p> Direction: " + result[j].directionsInfo + "</p>" + "<br>" + "<hr>" );
      $("#showWeather").append(list);

      $.ajax({
          url: 'http://api.openweathermap.org/data/2.5/weather?q=' + zipCode + "&units=imperial" + "&APPID=0d662bff66bb9cd3cbf1260d8c1c69d5",
          type: "GET",
          dataType: "jsonp"
        })
        .then(function (data) {
         
          console.log(data);
          // var weatherInfo = $("<ul>");
          // weatherInfo.attr("id", ulist);
          var listItems = $("<div class = 'container'>");
        // listItems.html()
        listItems.html("<h5> Humidity: "+ data.main.humidity + "</h5>" + "<h5> Temprature: " + data.main.temp + "</h5>" + "<br>");
        // listItems.text(response.data[j].description);
        
        // listItems.append(weatherInfo);
        $("#showWeather").append(listItems);
        })
        

    }

  })

  

});