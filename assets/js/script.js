var apiKey = "&units=imperial&appid=7fc2d608ebf66e206f3145c2c83cb073";
var apiUrl5 = "https://api.openweathermap.org/data/2.5/forecast?q=";
var apiUrl1 = "https://api.openweathermap.org/data/2.5/weather?q=";
var apiIcon = "https://openweathermap.org/img/wn/";
var imgUrl = "https://openweathermap.org/img/wn/";

var submitBtnEl = $(".searchBtn"); //save button for input txt


// var d = $(".days");
// var data = {};
// var dayArray = [];
function displayWeather(event) {
    event.preventDefault();

    var cityName = ($("#city").val());
    if(!cityName) { return; }
    if($(".currDay").children().length > 0) {
        $(".currDay").empty();
        currDay(cityName);
    } else {  currDay(cityName); }

    if($(".fiveCol").children().length > 0) {
        $(".fiveCol").empty();
        fiveDay(cityName);
    } else { fiveDay(cityName); }
    cityList(cityName);
}

function fiveDay(tname){
    var infoEl = $(".fiveCol");
    fetch(apiUrl5 + tname + apiKey)
    .then(function(response){
        response.json().then(function(data) {
            var list = data.list;
            var num = 4;
            for(var i = 0; i < list.length; i++) {
                if( i === num) {
                    var changeDt = moment.unix(list[i].dt).format("MM/DD/YY");
                    var date = $('<h3 class="row"></h3>').text("Date: " + changeDt); 
                    var iconUrl = apiIcon + list[i].weather[0].icon  + "@2x.png";
                    var icon = $('<img>').attr('src', iconUrl);
                    var temp = $('<p class="col"></p>').text('Temp: ' + list[i].main.temp +' F'); 
                    var wind = $('<p class="col"></p>').text('Wind: ' + list[i].wind.speed + 'MPH'); 
                    var humid = $('<p class="col"></p>').text('Humidity: ' + list[i].main.humidity + '%');                     
                    infoEl.append(date, icon, temp, wind, humid);
                    num += 8;
                }                 
            }
        });
    });
}

function currDay(tName) {
    fetch(apiUrl1 + tName + apiKey)
    .then(function(response){
        response.json().then(function(data) {
            var normDt = moment.unix(data.dt).format("MM/DD/YY");
            var date = $('<h2 class="col"></h2>').text(tName + " (" + normDt + ")"); 
            var iUrl = apiIcon + data.weather[0].icon  + "@2x.png";
            var icon = $('<img>').attr('src', iUrl);
            var temp = $('<p class="col"></p>').text('Temp: ' + data.main.temp +' F'); 
            var wind = $('<p class="col"></p>').text('Wind: ' + data.wind.speed + 'MPH'); 
            var humid = $('<p class="col"></p>').text('Humidity: ' + data.main.humidity + '%');     
             $(".currDay").append(date, icon, temp, wind, humid);
        });
    });
}

function cityList(theName) {
    var cityListEl = $(".city-container");
    var infoEl = $(".info5");
    var nString, cName;
   
 debugger;
    for(var a = 0; a < localStorage.length; a++) {
        console.log(localStorage.getItem(a));
        debugger;
        if((localStorage.getItem(a)) != theName) {
            console.log(localStorage.getItem(a));
            debugger;
           nString = '<button class="cityBtn" type="submit"></button>';
            localStorage.setItem(theName, nString);
            debugger;
            cName = $(nString).text(theName);
            cityListEl.append(cName);
            debugger;
        } else {
            
            nstring = localStorage.getItem(a).val();
            cName = $(nString).text(theName);
            cityListEl.append(cName);
            debugger;
        }

    }

    // $(".cityBtn").on("click", displayWeather);
    nString = '<button class="cityBtn" type="submit"></button>';
    cName = $(nString).text(theName);
    cityListEl.append(cName);
}

submitBtnEl.on("click", displayWeather);
