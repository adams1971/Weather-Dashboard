//may need var for lat and lon
$(document).ready(function () {
  var currentSearch = JSON.parse(localStorage.getItem("searchHistory")) || [];
  var apiKey = "75dd5d0d667ecff1fa08e5eb255eef0b";


  var d = new Date();
  document.getElementById("date").innerHTML = d;

  if (currentSearch.length != 0) {
    rendorPastSearches();
    callWeatherInfo(0);
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
      console.log(response);
      $("#cityName").text(response.name);
      $("#currentTemp").append(response.main.temp);
      $("#currentHum").append(response.main.humidity);
      $("#currentWind").append(response.wind.speed);

      var longitude = response.coord.lon;
      var latitude = response.coord.lat;

      var uvURL =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        latitude +
        "&lon=" +
        longitude +
        appId +
        apiKey;

      $.ajax({
        url: uvURL,
        method: "GET",
      }).then(function (res) {
        console.log("res=", res);
        var uvi = res.current.uvi;
        console.log("uvi = " + uvi);
        $("#currentUVI").append(uvi);
      });
    });
  });

  $(document).on("click", ".weatherSearch", function () {
    var index = this.value;
    callWeatherInfo(index);
    rendorPastSearches(index);
  });

  function rendorPastSearches() {
    $("#Past-Searches").empty();
    for (var i = 0; i < currentSearch.length; i++) {
      var location = currentSearch[i].location;

      var $li = $("<li>");
      $li.className = "list-group-item";
      var btn = $("<button>").text(location);
      $li.append(btn);
      btn.attr({
        class: "btn btn-light weatherSearch",
        value: i,
      });

      $("#Past-Searches").append($li);
    }
  }

  function callWeatherInfo(index) {
    var temp = currentSearch[index].currentObjectWeather;
    //$("#cityName").text(temp.name);
    //keep appending values
  }

  function updateWeather(location, currentObjectWeather, forecast, uviIndex) {
    var tempObj = {
      location: "",
      time: moment(),
      currentObjectWeather: {},
      forecast: {},
      uviIndex: {},
    };

    tempObj.location = location;
    tempObj.currentObjectWeather = currentObjectWeather;
    tempObj.forecast = forecast;
    tempObj.uviIndex= uviIndex;

    currentSearch.push(tempObj);
    localStorage.setItem("searchHistory", JSON.stringify(currentSearch));
  }
  //call render past searches with local storage hist
});
