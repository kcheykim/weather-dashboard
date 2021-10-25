var apiKey = "&appid=7fc2d608ebf66e206f3145c2c83cb073";
var apiUrl5 = "https://api.openweathermap.org/data/2.5/forecast?q=";
var apiUrl1 = "https://api.openweathermap.org/data/2.5/weather?q=";
var apiIcon = "https://openweathermap.org/img/wn/";
var unit = "&units=imperial";

var submitBtnEl = $(".searchBtn"); //save button for input txt

var infoEl = $(".fiveCol");
var d = $(".days");
var data = {};
var dayArray = [];
function searchCity(event) {
    event.preventDefault();
    var list, date, icon, temp, wind, humid;
    var cityName = $("#city").val();

   // if(cityName != "") {storeNames(cityName);}
   debugger;
   currDay(cityName);
   debugger;

    fetch(apiUrl5 + cityName + unit + apiKey)
        .then(function(response){
            response.json().then(function(data) {

                var list = data.list;
                var num = 4;
                for(var i = 0; i < list.length; i++) {
    
                    if( i === num) {
                       // console.log(list[i].dt_txt);
                            //var newCol = $('<div class= col-2></div>');
                        
                            var date = $('<p class="col"></p>').text("Date: " + list[i].dt); 
                            var icon = $('<p class="col"></p>').text("Icon: " + list[i].weather[0].icon); 
                            var temp = $('<p class="col"></p>').text('Temp: ' + list[i].main.temp +' F'); 
                            var wind = $('<p class="col"></p>').text('Wind: ' + list[i].wind.speed + 'MPH'); 
                            var humid = $('<p class="col"></p>').text('Humidity: ' + list[i].main.humidity + '%'); 
                    
                    
                       infoEl.append(date, icon, temp, wind, humid);
                        num = num + 8;
                    }                 

                }
            });
        });
        displayData(cityName);
}

function currDay(tName) {
    $(".city-name").text(tName);
    fetch(apiUrl1 + tName + unit + apiKey)
    .then(function(response){
        response.json().then(function(data) {

            var le = data;
            console.log(le.dt);
                    
            var date = $('<p class="col"></p>').text("Date: " + le.dt); 
            var icon = $('<p class="col"></p>').text("Icon: " + le.weather[0].icon); 
            var temp = $('<p class="col"></p>').text('Temp: ' + le.main.temp +' F'); 
            var wind = $('<p class="col"></p>').text('Wind: ' + le.wind.speed + 'MPH'); 
            var humid = $('<p class="col"></p>').text('Humidity: ' + le.main.humidity + '%'); 
                
                
                  $(".currDay").append(date, icon, temp, wind, humid);
                
        });
    });
}
function displayData(theName) {
    var cityListEl = $(".city-container");
    var infoEl = $(".info5");
    var cName = $('<button class="cityBtn w-100 h-25" type="submit"></button>').text(theName);
  //  console.log(theCityName);
    cityListEl.append(cName);
}



submitBtnEl.on("click", searchCity);
//$(".cityBtn").on("click", dummyFunc);