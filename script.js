//may need var for lat and lon
$(document).ready(function () {
  var currentSearch = JSON.parse(localStorage.getItem("searchHistory")) || [];
  var apiKey = "75dd5d0d667ecff1fa08e5eb255eef0b";


  var d = new Date();
  document.getElementById("date").innerHTML = d;

  if (currentSearch.length != 0) {
    rendorPastSearches();
    callWeatherInfo(0);
    callUviIndex(0);
    callForecast(0);
  }

  //call to search entered city
  $("#searchCityBtn").on("click", function () {
    var farenheit = "&units=imperial";
    var appId = "&appid=";

    //weather only API
    var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=";
    var cityEntered = $("#cityEntered").val();

    var selectedUrl = weatherURL + cityEntered + farenheit + appId + apiKey;

    $.ajax({
      url: selectedUrl,
      method: "GET",
    }).then(function (response) {
      var tempWeather = response;
      var longitude = response.coord.lon;
      var latitude = response.coord.lat;
      var uvURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + appId + apiKey;

      $.ajax({
        url: uvURL,
        method: "GET",
      }).then(function (res) {
        console.log("res= ", res)
        updateWeather(tempWeather.name, tempWeather, res);
        rendorPastSearches();
        callWeatherInfo(currentSearch.length - 1);
        callUviIndex(currentSearch.length - 1);
        callForecast(currentSearch.length - 1);
      });
    });
  });

  $(document).on("click", ".weatherSearch", function () {
    var index = this.value;
    callWeatherInfo(index);
    callUviIndex(index);
    rendorPastSearches(index);
  });

  $(".clear").on("click", function () {
    localStorage.clear();
    location.reload();
  })

  function rendorPastSearches() {
    $("#Past-Searches").empty();
    for (var i = 0; i < currentSearch.length; i++) {
      var location = currentSearch[i].location;
      console.log("location= " + location);
      var btn = $("<button>").text(location);

      btn.attr({
        class: "btn btn-light weatherSearch",
        value: i,
      });

      $("#Past-Searches").append(btn);
    }
  }

  function callWeatherInfo(index) {
    let temp = currentSearch[index].currentObjectWeather;
    console.log("temp= ", temp);
    $("#cityName").text(temp.name + " (" + moment(currentSearch[index].time).format("M/DD/YYYY") + ") ");
    $("#cityName").append($("<img>").attr("src", getIcon(temp.weather[0].icon)));
    $("#currentTemp").text("Temperature: " + temp.main.temp);
    $("#currentHum").text("Humidity: " + humidityText(temp.main.humidity));
    $("#currentWind").text("Wind Speed: " + temp.wind.speed + " MPH");
  }

  function callForecast(index) {
    $("#fiveDayForecast").empty();
    let temp = currentSearch[index].forecast;
    console.log("forecast temp= ",temp);
    var count = 8;
    var days = [0, count, 2 * count, 3 * count, 4 * count];
    console.log("days= "+days);
    for (var i = 0; i < days.length; i++) {
      var tempWeather = temp.daily[i];
      console.log("tempWeather line 96= ", tempWeather);
      var tempHead = $("<div>").attr({
        class: "col-sm-2 border rounded",
        style: "background: blue; margin-right: auto; margin-left: auto;"
      });
      var tempDate = $("<p>").text(moment(tempWeather.dt_txt).format("MM/DD/YYYY"));
      tempDate.attr("class", "text-white");
      var tempImg = $("<img>").attr("src", getIcon(tempWeather.weather[0].icon));
      var tempTemp = $("<p>").text("Temperature: " + farenheit(tempWeather.temp.day));
      tempTemp.attr("class", "text-white");
      var tempHumid = $("<p>").text("Humidity: " + humidityText(tempWeather.humidity));
      tempHumid.attr("class", "text-white");

      tempHead.append(tempDate, tempImg, tempTemp, tempHumid);
      
      $("#fiveDayForecast").append(tempHead);
    }
  };

  function callUviIndex(index) {
    let temp = currentSearch[index].forecast.current.uvi;
    console.log("uvi temp= ", temp);
    $("#currentUVI").text("UVI Index: " + temp.value);
  }

  function updateWeather(location, currentObjectWeather, forecast, uviIndex) {
    var tempObj = {
      location: "",
      time: moment(),
      currentObjectWeather: {},
      forecast: {},
      uviIndex: {},
    };

    console.log("tempObj= ", tempObj);

    tempObj.location = location;
    tempObj.currentObjectWeather = currentObjectWeather;
    tempObj.forecast = forecast;
    tempObj.uviIndex = uviIndex;

    currentSearch.push(tempObj);
    localStorage.setItem("searchHistory", JSON.stringify(currentSearch));
  }

  function getIcon(iconID) {
    return "http://openweathermap.org/img/wn/" + iconID + "@2x.png";
  }

  function humidityText(humidity) {
    return humidity + "%";
  }

    function farenheit(temperature) {
      let temp = ((temperature - 273.15) * 9 / 5) + 32;
      temp = Math.floor(temp);
      return temp + "°F";
    }


});