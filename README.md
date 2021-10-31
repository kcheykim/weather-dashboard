# Weather Dashboard
The purpose of this challenge is to create a Weather Dashboard with an input to seach for a city. Once searched, the page will display the city name, the current date, current day weather condition icon, current day temperature, curent day humidity, current day wind speed and current day UV index with colors to indicate whether it is favorable (green), moderate (yellow) and severe (red). Under the current day, the page will also display the next five days forecasts with the date, icon, temperature and humidity. If one of the city button on the right side is click, it will display the current day and five day forecast datas without having to revisit the search button.

## Built With
* HTML
* CSS
* Bootstrap
* JavaScript
* jQuery
* moment.js
* OpenWeather

## HTML
* A page that contains a Weather Dashboard title on the top. It also contains an input area and search button. If there are cities that has been searched, it will also displayed those cities under the search button on the right hand side. If a request for a city is submit, the page will display the current day data and the next five day forecast. 

## CSS with Bootstrap
* The page can be viewed across different screen sizes with a layout using Bootstrap and CSS. CSS and Bootstrap styles the elements and styles the elements that are created in the script.

## JavaScript coding with jQuery and using moment.js and OpenWeather Query
* Using JavaScript, jQuery and moment.js and fetching the OpenWeather api for data to display and output the data for the search city. The search will display the city's information of the current day using the weather api, the uv index using the one-all api and the forecast for the 5 day data. The UVI will diplay in color depending on the condition. The element will remove or empty from previous search to display only the current requested city. The cities list on the side can be click to present with the same infomation without having to search again. 


## Website
https://kcheykim.github.io/weather-dashboard/

## Image of Website
![weather-dashboard](./assets/images/weather-dashboard.png?raw=true)

