
//may need var for lat and lon
$(document).ready(function () {
    var farenheit = "&units=imperial";
    var longitude = "lon=lon";
    var latitude = "lat=lat";
    var appId = "&appid=";
    var apiKey = "75dd5d0d667ecff1fa08e5eb255eef0b";
    var currentSearch = JSON.parse(localStorage.getItem("searchHistory"));
    var cityHistory = [];
    console.log(currentSearch);
    var d = new Date ();
    document.getElementById ("date").innerHTML =d;
    // searchCityBtn.textContent = cityEntered;
    // console.log(cityEntered)

    //call to search entered city
    $("#searchCityBtn").on("click", function () {
        
        //weather only API
        var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=";
       
       // all in one API 
       //var weatherURL = "https://api.openweathermap.org/data/2.5/onecall?="; 
        
        
        var cityEntered = $("#cityEntered").val();
        var ajaxUrl = weatherURL+cityEntered+farenheit+appId+apiKey;
        // +longitude+latitude

        //set to local storage
        if (currentSearch !== null) {
            cityHistory = currentSearch
        }
        cityHistory.push(cityEntered);
        let stringify = JSON.stringify(cityHistory);
        localStorage.setItem("searchHistory", stringify);
        rendorPastSearches(currentSearch)


        //console.log("city=" + cityEntered);
        // console.log("url: " + ajaxUrl);
    
        $.ajax({
            url: ajaxUrl,
            method: "GET",
        }).then(function (response) {
            console.log(response);
            $("#cityName").text(response.name);
            $("#currentTemp").text("Temp: " + response.main.temp);
            $("#currentHum").text("Humidity: " + response.main.humidity);
            $("#currentWind").text("Wind: " + response.wind.speed);
        });
        
        //remember to add the UVI api url
        // var uviURL = "http://api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}&appid={75dd5d0d667ecff1fa08e5eb255eef0b}";
        
        // var cityEntered = $("#cityEntered").val();
        // var ajaxUrl = uviURL+cityEntered+appId+apiKey;
        //     // $("#uviIcon").text(response.uviIcon);

        //     $.ajax({
        //         url: ajaxUrl,
        //         method: "GET",
        //     }).then(function (response) {
        //         console.log(response);
        //         $("#UV Index").text(response.main.uvindex);
        
        //     });


    });

    function rendorPastSearches (pastSearch) {
        pastSearch = JSON.parse(localStorage.getItem("searchHistory"));
        if (pastSearch !== null) {
            console.log(pastSearch);
            $($ulElement).html ("")
            //check if past searches has a value
            // if past are avail, then create UL and add location
            //var $pastSearches = $("#Past-Searches");
            
            // assigne var for past search id
            //create UL
            //append the UL to id
            for (var i =0; i < pastSearch.length; i++) {
                
                var $li = $("<li>")
                $li.className = "list-group-item"
                $li.text(pastSearch[i])
                $li.on("click", function () {
                    console.log("eventListener", $(this).text())} )
                $ulElement.append($li);
            }
        }
    };
     
    //call render past searches with local storage hist

    var $ulElement = $("<ul>")
    $("#Past-Searches").append($ulElement)
    rendorPastSearches (currentSearch)
     
    //$(".list-group-item").remove()

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
//7 WHEN I click on a city in the search history
//THEN I am again presented with current and future conditions for that city
//8 repeat
