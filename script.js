//GIVEN a weather dashboard with form inputs
//WHEN I search for a city
    //1 get API and key 
$(document).ready(function() {
    function getDailyRequest(cityEntered) {
        return`https://api.openweathermap.org/data/2.5/weather?q=${cityEntered}&units=imperial&appid=75dd5d0d667ecff1fa08e5eb255eef0b`
    }
    $("#searchCityBtn").on("click", function (event) {
        //console.log(event);
        var cityEntered = $("#cityEntered").val()
        //getWeatherData(cityEntered);
        console.log(cityEntered);
        })
    function getWeatherData(cityEntered) {
    $.ajax({
        url: getDailyRequest(cityEntered), 
        method: "GET",
    }).then(function (response) {
        console.log(response)
    });
}
})
//THEN I am presented with current and future conditions for that city and that city is added to the search history
    //2 add the search to local storage
//WHEN I view current weather conditions for that city
//THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
    //3use font aswesome and show icon
//WHEN I view the UV index
//THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
//WHEN I view future weather conditions for that city
//THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
//WHEN I click on a city in the search history
//THEN I am again presented with current and future conditions for that city
