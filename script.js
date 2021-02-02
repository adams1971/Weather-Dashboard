//GIVEN a weather dashboard with form inputs
//WHEN I search for a city
//1 get API and key

$(document).ready(function () {
    var farenheit = "&units=imperial";
    var appId = "&appid=";
    var apiKey = "75dd5d0d667ecff1fa08e5eb255eef0b";
    
    $("#searchCityBtn").on("click", function () {
        var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=";
        
        var cityEntered = $("#cityEntered").val();
        var ajaxUrl = weatherURL+cityEntered+farenheit+appId+apiKey;
        // console.log("city=" + cityEntered);
        // console.log("url: " + ajaxUrl);
    
        $.ajax({
            url: ajaxUrl,
            method: "GET",
        }).then(function (response) {
            console.log(response);
            $("#cityName").text(response.name);
            $("#currentTemp").text(response.main.temp)
            $("#currentHum").text(response.main.humidity)
            $("#currentWind").text(response.wind.speed)
        });
 
        var weatherUVI = "";//remember to add the api url

        var ajaxUVI = weatherUVI+cityEntered+appId+apiKey;

    });






});
//THEN I am presented with current and future conditions for that city and that city is added to the search history
//2 add the search to local storage
//WHEN I view current weather conditions for that city
//THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
//3 add mon=ment.js for date
//4 use font aswesome and show icon
//WHEN I view the UV index
//THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
//5 use a new API for UVI
//WHEN I view future weather conditions for that city
//THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
//6 dynamically add the 5 day forcast cards
//WHEN I click on a city in the search history
//THEN I am again presented with current and future conditions for that city
//7 repeat
