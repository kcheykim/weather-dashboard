//var apiKey = "&appid=7fc2d608ebf66e206f3145c2c83cb073";
//var apiUrl ="https://api.openweathermap.org/data/2.5/forecast?q=";
var counter = 0;

var submitBtnEl = $(".searchBtn"); //save button for input txt


////fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=7fc2d608ebf66e206f3145c2c83cb073")
//console.log(apiUrl + cityName + apiKey);
// fetch("apiUrl" + cityName + "apiKey")


//api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}

// fetch("https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=fd5967fd42c5816f972f3c2953622952")
// .then(function(response){return response.json()})
// .then(function(data){console.log(data)
//   console.log(data.name);
// });

function searchCity(event) {
    event.preventDefault();
    var path = $(this).parent(".city-container").siblings(".main-info").children(".info5").children(".day1");
    var cityName = $(this).siblings(".input-city").val();
    localStorage.setItem(counter, cityName);
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=7fc2d608ebf66e206f3145c2c83cb073")
        .then(function(response){
            if(response.ok){
                return response.json().then(function(data) {
                    for(var i =0; i < data.length; i++) {
                        path = data.id;
                        alert(path);
                        console.log(path);
                    }
                });
            }
        });
        
    counter++;
}

submitBtnEl.on("click", searchCity);