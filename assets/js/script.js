var apiKey = "&units=imperial&appid=7fc2d608ebf66e206f3145c2c83cb073";
var apiUrl5 = "https://api.openweathermap.org/data/2.5/forecast?q=";
var apiUrl1 = "https://api.openweathermap.org/data/2.5/weather?q=";
var apiIcon = "https://openweathermap.org/img/wn/";

var submitBtnEl = $(".searchBtn"); //save button for input txt
var keyId = "";
var ll = null;

function displayWeather(event) {
    event.preventDefault();


    var cityName = ($("#city").val());
    if (!cityName) { return; }
    if ($(".currDay").children().length > 0) {
        $(".currDay").empty();
        currDay(cityName);
    } else { currDay(cityName); }

    if ($(".holder").children().length > 0) {
        debugger;
        $(".holder").remove();
        fiveDay(cityName);
    } else { fiveDay(cityName); }
}

function fiveDay(tname) {
    var infoEl = $(".container-data");
    var divContainer = $('<div class="holder col-12 d-flex position-relative" style="justify-content: space-evenly;"></div>');
    infoEl.append(divContainer);
    // var date, icon, temp, wind, humid;
    fetch(apiUrl5 + tname + apiKey)
        .then(function(response) {
            response.json().then(function(data) {
                var list = data.list;
                var num = 0
                for (var i = 0; i < list.length; i++) {

                    if ((list[i].dt_txt.split(" ")[1]) === "12:00:00") {
                        debugger;
                        // var divContainer = $('<div class="col holder flex-item">');
                        // infoEl.append(divContainer);
                        var divC = $('<div></div>');


                        var changeDt = moment.unix(list[i].dt).format("MM/DD/YY");
                        var date = $('<h3 class=""></h3>').text(changeDt);
                        var iconUrl = apiIcon + list[i].weather[0].icon + "@2x.png";
                        var icon = $('<img>').attr('src', iconUrl);
                        var temp = $('<p class=""></p>').text('Temp: ' + list[i].main.temp + ' F');
                        var wind = $('<p class=""></p>').text('Wind: ' + list[i].wind.speed + 'MPH');
                        var humid = $('<p class=""></p>').text('Humidity: ' + list[i].main.humidity + '%');
                        divC.append(date, icon, temp, wind, humid);
                        // $(".holder").append(date, icon, temp, wind, humid);
                        $(".holder").append(divC);

                    }

                }
            });
        });
}

function currDay(tName) {
    fetch(apiUrl1 + tName + apiKey)
        .then(function(response) {
            response.json().then(function(data) {
                var keyId = data.dt;
                //alert(keyId);
                localStorage.setItem(keyId, tName);
                var nameBtn = $('<button class="cityBtn mb-3 w-100" data-id="' + keyId + '"type="submit"></button>').text(tName);
                $(".city-container").append(nameBtn);
                // cityList();
                var normDt = moment.unix(data.dt).format("MM/DD/YY");
                var date = $('<h2 class="col"></h2>').text(tName + " (" + normDt + ")");
                var iUrl = apiIcon + data.weather[0].icon + "@2x.png";
                var icon = $('<img>').attr('src', iUrl);
                var temp = $('<p class="col"></p>').text('Temp: ' + data.main.temp + ' F');
                var wind = $('<p class="col"></p>').text('Wind: ' + data.wind.speed + 'MPH');
                var humid = $('<p class="col"></p>').text('Humidity: ' + data.main.humidity + '%');
                $(".currDay").append(date, icon, temp, wind, humid);
            });
        });
}

function cityList() {

    alert("hi");
    // for (var a = 0; a < localStorage.length; a++) {
    //     // //    //console.log(localStorage.getItem(i));
    //     // //    console.log($("time-block").attr("data-id",i));
    //     // $(".container").find("data-id",i).children(".description").val(localStorage.getItem(i));
    //     var x = localStorage.getItem(a);
    //     console.log(a);
    //     var nameBtn = $('<button class="cityBtn mb-3 w-100" type="submit"></button>').text(JSON.parse(localStorage.getItem(a)));
    //     $(".city-container").append(nameBtn);
    // }
    // while (localStorage.length > 0) {
    // debugger;
    // $(".cityBtn").each(function() {
    //     debugger;
    //     var id = parseInt($(this).attr("data-id"));
    //     // console.log(id);
    //     // //alert(id);
    // for (var a = 0; a < localStorage.length; a++) {
    //     var name = localStorage.getItem(a).val();
    //     alert(name);
    //     debugger;
    //     var nameBtn = $('<button class="cityBtn" data-id="' + id + '"type="submit"></button>').text(name);
    //     $(".city-container").append(nameBtn);
    // }
    //     });
    // } else {
    // displayWeather();
}
// for (var a = 0; a < localStorage.length; a++) {

//     var name = JSON.parse(localStorage.getItem("keyId));
//             alert(keyId); alert(name);
//             var nameBtn = $('<button class="cityBtn" type="submit"></button>').text(name); $(".city-container").append(nameBtn);
//             // alert(name);
//             // // var cName = $('<button class="cityBtn" type="submit"></button>').text(name);
//             // // var cName = $('<button class="cityBtn" type="submit"></button>').text(name);



//             // var cityListEl = $(".city-container");
//             // cityListEl.append(cName);
//             // console.log(lString);

//         }
//     



//https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

$(document).ready(() => {
    debugger;
    cityList();
    debugger;
    submitBtnEl.on("click", displayWeather);

});