var apiKey = "&appid=7fc2d608ebf66e206f3145c2c83cb073";
var apiUrl ="https://api.openweathermap.org/data/2.5/forecast?q=";

var submitBtnEl = $(".searchBtn"); //save button for input txt
var cityListEl = $(".city-container");
var infoEl = $(".info5")
var weather = {};

function searchCity(event) {
    event.preventDefault();
    var list;
   // var path = $(this).parent(".city-container").siblings(".main-info").children(".info5").children(".day1");
    var cityName = $("#city").val();
    debugger;

    if(cityName != "") {storeNames(cityName, list);}

    fetch(apiUrl + cityName + apiKey)
        .then(function(response){
            response.json().then(function(data) {
                // console.log(data);
                // console.log(data.list);
                var list = data.list;
                var num = 3;
                for(var i = 0; i < list.length; i++) {
                  
                    if( i == num) {
                        console.log(list[i].dt_txt);
                        var cityWeather = {
                            date: list[i].dt_txt,
                            icon: list[i].weather[0].icon,
                            temp: list[i].main.temp,
                            wind: list[i].wind.speed,
                            humid: list[i].main.humidity
                        }
                    localStorage.setItem(cityName, JSON.stringify(cityWeather));
                    num = num + 8;
                    }
                }
            });
        });
}

function storeNames(theCityName, theList) {
    var cName = $('<button class="cityBtn" type="submit"></button>').text(theCityName);
    cityListEl.append(cName);

    for(var j = 0; j < 5; j++) {
        var data = $('<div class="day"></div>').text(localStorage.getItem("thecityName"));
        $(".day5").append(data);

        console.log(data);
    }
}

    



submitBtnEl.on("click", searchCity);