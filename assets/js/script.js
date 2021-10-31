var apiKey = "&units=imperial&appid=7fc2d608ebf66e206f3145c2c83cb073";
var apiUrl5 = "https://api.openweathermap.org/data/2.5/forecast?q=";
var apiUrl1 = "https://api.openweathermap.org/data/2.5/weather?q=";
var apiIcon = "https://openweathermap.org/img/wn/";
var apiUvi = "https://api.openweathermap.org/data/2.5/onecall?lat=";

var historyBtnClick = 0; //a marker for if name is already part of city list

function cityList() { //display the history buttons when the page starts
    for (var a = 0; a < localStorage.length; a++) { //retrieve it from the localstorage
        var keyId = localStorage.key(a);
        //create the button element
        var nameBtn = $('<button class="cityBtn mb-4 w-75" data-id="' + keyId + '" type="submit"></button>').text(localStorage.getItem(keyId));
        $(".city-container").append(nameBtn); //append it to display
    }
}

function displayWeather(event) { //function calls when the search button is clicked with a city name input
    event.preventDefault();
    var cityName = ($("#city").val()); //input set to cityName
    if (!cityName) { return; } //forced the user to put in a value before submit
    $(".cityBtn").each(function() { //check to see if the name already existed, if so set marker to 1
        if (cityName == $(this).text()) { historyBtnClick = 1; }
    });
    currDay(cityName); //send the name to currDay function
}

function displayCityBtn(event) { //function is called when one of the city from side button is clicked
    event.preventDefault();
    var historyName = $(this).text(); //grab the name from the text of the button
    historyBtnClick = 1; //set the marker to 1
    currDay(historyName); //call the current day function wtih the city name
}

function currDay(tName) { //current day function to output the current day info
    $(".currDay").empty(); //empty the children of current day
    fetch(apiUrl1 + tName + apiKey) //fetch the current day data
        .then(function(response) {
            if (response.ok) { //if the fetch is okay
                response.json().then(function(data) {
                    var keyId = data.id; //get the id for the local storage
                    var latId = data.coord.lat; //get the latitude for UV Index
                    var lonId = data.coord.lon; //get the longitude for UV Index
                    displayUV(latId, lonId); //call the UV Index function and pass it the lat and lon value
                    localStorage.setItem(keyId, tName); //store the name and the id into the local storage
                    if (historyBtnClick == 0) { //if the name doesn't exists, then create a new button 
                        var nameBtn = $('<button class="cityBtn mb-4 w-75" data-id="' + keyId + '" type="submit"></button>').text(tName);
                        $(".city-container").append(nameBtn);
                    } else { //otherwise, reset the marker back to zero
                        historyBtnClick = 0;
                    }
                    //create and output all the current day data
                    var normDt = moment.unix(data.dt).format("MM/DD/YY");
                    var date = $('<h2 class="col"></h2>').text(tName + " (" + normDt + ")");
                    var iUrl = apiIcon + data.weather[0].icon + "@2x.png";
                    var icon = $('<img>').attr('src', iUrl);
                    var temp = $('<p class="col"></p>').text('Temp: ' + data.main.temp + ' F');
                    var wind = $('<p class="col"></p>').text('Wind: ' + data.wind.speed + ' MPH');
                    var humid = $('<p class="col mb-3"></p>').text('Humidity: ' + data.main.humidity + '%');
                    $(".currDay").append(date, icon, temp, wind, humid);
                });
            } else { //output an error if the response of the fetch is invalid
                var message = $('<p class="col"></p>').text("INVALID CITY");
                $(".currDay").append(message);
            }
        });
    fiveDay(tName); //calll the five day function to output the five day datas
}

function displayUV(theLat, theLon) { //the UV function just to display the UV index
    fetch(apiUvi + theLat + "&lon=" + theLon + apiKey) //fetch the UV index data
        .then(function(response) {
            if (response.ok) { //see if the response is okay
                response.json().then(function(data) {
                    var uviData = data.current.uvi; //if the uv index is (<=2 -> green), (3-7 -> yellow),(8+ -> red)
                    if (uviData < 3) { var uvIndex = $('<span class="p-3 bg-success"></span>').text('UV Index: ' + uviData); }
                    if (uviData > 7) { var uvIndex = $('<span class="p-3 bg-danger"></span>').text('UV Index: ' + uviData); }
                    if (uviData >= 3 && uviData <= 7) { var uvIndex = $('<span class="p-3 bg-warning"></span>').text('UV Index: ' + uviData); }
                    $(".currDay").append(uvIndex); //display the UVI index with its color
                });
            } else { //display error if cannot fetch
                var message = $('<p class="col"></p>').text("CANNOT DISPLAY UVI INDEX");
                $(".currDay").append(message);
            }
        });
}

function fiveDay(tname) { //five day function to output the next 5day forecast
    $(".holder").remove(); //remove the element and its children
    $(".info5").empty(); //empty out the children

    //creating new elements to 1st to hold the five day forces
    var divContainer = $('<div class="holder col-12 position-relative" style="justify-content: space-between;"></div>');
    var h2Title = $('<h2 class="forecast-title"></h2>').text('5-Day Forecast:'); //output the text of 5-day Forecast

    $(".info5").append(h2Title); //appending the text 
    $(".container-data").append(divContainer); //appending the new element divContainer
    fetch(apiUrl5 + tname + apiKey) //fetch the api for a 5day forecast
        .then(function(response) {
            if (response.ok) { //if the response if okay then...
                response.json().then(function(data) {
                    var list = data.list; //grab the data
                    for (var i = 0; i < list.length; i++) {
                        if ((list[i].dt_txt.split(" ")[1]) === "12:00:00") { //retrieving on the data at noon
                            //create elements and display each individual forecast
                            var divC = $('<div class="individual"></div>');
                            var changeDt = moment.unix(list[i].dt).format("MM/DD/YY");
                            var date = $('<h3 class=""></h3>').text(changeDt);
                            var iconUrl = apiIcon + list[i].weather[0].icon + "@2x.png";
                            var icon = $('<img>').attr('src', iconUrl);
                            var temp = $('<p class=""></p>').text('Temp: ' + list[i].main.temp + ' F');
                            var wind = $('<p class=""></p>').text('Wind: ' + list[i].wind.speed + 'MPH');
                            var humid = $('<p class=""></p>').text('Humidity: ' + list[i].main.humidity + '%');
                            divC.append(date, icon, temp, wind, humid);
                            $(".holder").append(divC);
                        }
                    }
                });
            } else {
                var message = $('<p class="col"></p>').text("NO DATA FOR INVALID CITY");
                $(".holder").append(message); //output an error if response is invalid
            }
        });
}

$(document).ready(() => {
    cityList(); //display the history of cities that has been searched
    $(".searchBtn").on("click", displayWeather);
    $(".cityBtn").on("click", displayCityBtn);
});