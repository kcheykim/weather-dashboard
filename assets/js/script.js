var apiKey = "&units=imperial&appid=7fc2d608ebf66e206f3145c2c83cb073";
var apiUrl5 = "https://api.openweathermap.org/data/2.5/forecast?q=";
var apiUrl1 = "https://api.openweathermap.org/data/2.5/weather?q=";
var apiIcon = "https://openweathermap.org/img/wn/";
var apiUvi = "https://api.openweathermap.org/data/2.5/onecall?lat=";

var submitBtnEl = $(".searchBtn"); //save button for input txt
var cityBtnEl = $(".city-container");
var historyBtnClick = 0;

function displayWeather(event) {
    event.preventDefault();
    var cityName = ($("#city").val());
    if (!cityName) { return; }

    $(".cityBtn").each(function() {
        var name = $(this).text();
        if (cityName == name) {
            historyBtnClick = 1;
        }
    });
    currDay(cityName);
}

function fiveDay(tname) {
    $(".holder").remove();
    $(".info5").empty();
    var infoEl = $(".container-data");
    var divContainer = $('<div class="holder bg-info rounded col-12 p-3 position-relative" style="justify-content: space-between;"></div>');
    var h2Title = $('<h2 class="forecast-title"></h2>').text('5-Day Forecast:');

    $(".info5").append(h2Title);
    infoEl.append(divContainer);
    fetch(apiUrl5 + tname + apiKey)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    var list = data.list;
                    for (var i = 0; i < list.length; i++) {
                        if ((list[i].dt_txt.split(" ")[1]) === "12:00:00") {
                            var divC = $('<div class="idividual"></div>');
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
                $(".holder").append(message);
            }
        });
}

function currDay(tName) {
    $(".currDay").empty();
    fetch(apiUrl1 + tName + apiKey)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    console.log(data);
                    var keyId = data.id;
                    var latId = data.coord.lat;
                    var lonId = data.coord.lon;
                    displayUV(latId, lonId);
                    localStorage.setItem(keyId, tName);
                    if (historyBtnClick == 0) {
                        var nameBtn = $('<button class="cityBtn mb-4 w-75" data-id="' + keyId + '" type="submit"></button>').text(tName);
                        $(".city-container").append(nameBtn);
                    } else {
                        historyBtnClick = 0;
                    }
                    var normDt = moment.unix(data.dt).format("MM/DD/YY");
                    var date = $('<h2 class="col"></h2>').text(tName + " (" + normDt + ")");
                    var iUrl = apiIcon + data.weather[0].icon + "@2x.png";
                    var icon = $('<img>').attr('src', iUrl);
                    var temp = $('<p class="col"></p>').text('Temp: ' + data.main.temp + ' F');
                    var wind = $('<p class="col"></p>').text('Wind: ' + data.wind.speed + ' MPH');
                    var humid = $('<p class="col mb-3"></p>').text('Humidity: ' + data.main.humidity + '%');
                    $(".currDay").append(date, icon, temp, wind, humid);
                });
            } else {
                var message = $('<p class="col"></p>').text("INVALID CITY");
                $(".currDay").append(message);
            }
        });
    fiveDay(tName);
}

function displayUV(theLat, theLon) {
    fetch(apiUvi + theLat + "&lon=" + theLon + apiKey)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    var uviData = data.current.uvi;
                    if (uviData < 3) { var uvIndex = $('<span class="p-3 bg-success"></span>').text('UV Index: ' + uviData); }
                    if (uviData > 7) { var uvIndex = $('<span class="p-3 bg-danger"></span>').text('UV Index: ' + uviData); }
                    if (uviData >= 3 && uviData <= 7) { var uvIndex = $('<span class="p-3 bg-warning"></span>').text('UV Index: ' + uviData); }
                    $(".currDay").append(uvIndex);
                });
            } else {
                var message = $('<p class="col"></p>').text("CANNOT DISPLAY UVI INDEX");
                $(".currDay").append(message);
            }
        });
}

function cityList() {
    // $(".cityBtn").remove();
    for (var a = 0; a < localStorage.length; a++) {
        var keyId = localStorage.key(a);
        var nameBtn = $('<button class="cityBtn mb-4 w-75" data-id="' + keyId + '" type="submit"></button>').text(localStorage.getItem(keyId));
        $(".city-container").append(nameBtn);
    }
}

function displayCityBtn(event) {
    event.preventDefault();
    var historyName = $(this).text();
    currDay(historyName);
    historyBtnClick = 1;

}

$(document).ready(() => {
    cityList();
    submitBtnEl.on("click", displayWeather);
    $(".cityBtn").on("click", displayCityBtn);
});