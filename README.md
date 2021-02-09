# Weather-Dashboard


## My Task

To create a weather app using an API that will display users searched cities current weather (temp, humidity, wind speed and uv index). Additionally the app will display the five day forcast. Each city search will be stored in local storage and will create a re-call button. 
To accomplish this I used Open Weather Map third-party API. Some of my challenges were connecting 3 different api's from OWM's site. I used 3 api's to accomplish longitude and latitude locations, UVI and daily forcasting. When I tried to use the Onecall API on its own, the 5 day forecast displayed 5- 3 hours forcast cards. To overcome this challenge, I needed to use an addiotional API for the daily forcast. For the current time, I used moment.js to displays the most up to date time related to the most current search. 

One challenge not over come was to refresh the five forcast when selecting a past search city. This function only updated the current temp card, leaving the five day cards as the privious search.

Additional steps were taken to update the css and html- this site was build from thr ground up. 


### The Problem
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```


```
# Acceptance Critieria

#### GIVEN a weather dashboard with form inputs
#### WHEN I search for a city
# THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city

## Technoligies used 
Html
CSS
JavaScript
Jquiery
OpenWeatherMap API's
```
