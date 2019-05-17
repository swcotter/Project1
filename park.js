$(document).ready(function(){
 $("#getWeather").click(function(){
var city = $("#city").val();
event.preventDefault();

if(city != ""){
    //this api call weather 
    $.ajax({
        url:'http://api.openweathermap.org/data/2.5/weather?q=' + city + "&units=imperial" + "&APPID=0d662bff66bb9cd3cbf1260d8c1c69d5",
        type: "GET",
        dataType:"jsonp",
        success: function(data){


            //creating elements 
            var widget = show(data);

            //select and append created elemts to parent edlement
            $("#showweather").html(widget);
            
            console.log(data);
             // $("#city").val("") ;
        }
       
    
    });
}else{
    $("#error").html("field cannot be empty");
}

 });
 
});

function show(data) {
    return "<h4><strong>Weather: </strong>" + data.weather[0].main + "</h4>" +
            "<h4><strong>Description: </strong>" + data.weather[0].description + "</h4>" +
            "<h4><strong>Humidity: </strong>" + data.main.humidity + "</h4>" +
            "<h4> <strong>Windspeed: </strong> " + data.wind.speed + "</h4>" + 
            "<h4> <strong>Tempraure: </strong>" + data.main.temp + " Degree F" + "</h4>" +
            "<h4><strong>city Name: </strong>" + data.name + "</h4>" ;
            
    
}





























