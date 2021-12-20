// leave space for querySelectors
var weatherContainerEl = document.querySelector('#weather-container');
var weatherSearchTerm = document.querySelector('#weather-search-term');


// geo api  http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
// api key is b3e2bf242500fea051a4efa17da1cf49
// api structure is api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// create the function that fetches the data from the third party api
var getLongLat = function (city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=b3e2bf242500fea051a4efa17da1cf49";

    // make fetch
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                getLatLon(data, city)
                //console.log(data.coord.lon)
            })
        }
    })
   
   
};
function getLatLon(data) {
    lat = data.coord.lat
    lon = data.coord.lon
    getWeatherRepos(lat, lon)
}
var getWeatherRepos = function (lat, lon) {
    //console.log(lat, lon)
    // format the open weather api url
        var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly&units=imperial&appid=b3e2bf242500fea051a4efa17da1cf49";

    // make a request to the url
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayWeather(data);
                futureWeather(data);
                //console.log(data)
            });
        } else {
            alert("Error: City Not Found Check Spelling!");
        };
    })
    .catch(function(error) {
        alert("Gotta upgrade that internet homie!")
    })
    console.log('function was called ho')
};
var cityFormEl = document.querySelector('#city-form');
var cityInputEl = document.querySelector('#city-name');

var formSubmitHandler = function (event) {
    event.preventDefault();
    // get value from input element
    var city = cityInputEl.value.trim();
    saveSearch(city)
    if (city) {
        getLongLat(city);
        //cityName(cityInputEl.value);
        cityInputEl.value = '';
    } else {
        alert('Please enter a city Name');
    }
    console.log(event);
};


// display weather cards
var displayWeather = function(city, cityInputEl) {
    // console.log(cityInputEl)
    // check if we pulled weather data
    if (city.length === 0) {
        weatherContainerEl.textContent = "City not found.";
        return;
    }
    //var myDate = new Date( your epoch date *1000);
    //document.write(myDate.toGMTString()+"<br>"+myDate.toLocaleString());
    var weatherCard = document.getElementById("weather-container");
    var {dt, temp, humidity, uvi, wind_speed}= city.current;

    // var cityName = document.createElement('h2')
    // cityName.textContent = cityInputEl.value;

    var currentDate = document.createElement("div");
    currentDate.textContent = "Date: " + (dt);

    var tempCurrent = document.createElement("div");
    tempCurrent.textContent = "Current Temp: " + (temp);

    var humidityCurrent = document.createElement("div");
    humidityCurrent.textContent = "Humidity: " + (humidity);

    var uvCurrent = document.createElement("div");
    uvCurrent.textContent = "UV Index: " + (uvi);

    var windCurrent = document.createElement("div");
    windCurrent.textContent = "Wind Speed: " + (wind_speed);
    
    // console.log('#city-name'.value);

    //weatherCard.appendChild(cityName);
    weatherCard.appendChild(currentDate);
    weatherCard.appendChild(tempCurrent);
    weatherCard.appendChild(humidityCurrent);
    weatherCard.appendChild(uvCurrent);
    weatherCard.appendChild(windCurrent);

    
    //weatherContainerEl.textContent = "";
    //weatherSearchTerm.textContent = city;
    //console.log (tempCurrent))
}

var futureWeather = function (data) {
    
    for (var i = 0; i < 5; i++) {
        console.log(data.daily[i]);
        var future = document.getElementById('future');
        var futureDiv = document.createElement('div');
        futureDiv.className = 'future card';
        future.appendChild(futureDiv);

        
        
        var {dt, weather, temp, wind_speed, humidity}= data.daily[i];

        var futureDate = document.createElement("div");
        futureDate.textContent = 'Date: ' + (dt);

        // var futureConditions = document.createElement('li');
        // futureConditions.textcontent = weather[i].icon;

        var futureTemp = document.createElement('div');
        futureTemp.textContent = 'Temperature Max: ' + (temp.max) + ' Min: ' + (temp.min);

        var futureWind = document.createElement('div');
        futureWind.textContent = 'Wind Speed: ' + (wind_speed);

        var futureHumidity = document.createElement('div');
        futureHumidity.textContent = 'Humidity: ' + (humidity);

        futureDiv.appendChild(futureDate);
        // future.appendChild(futureConditions);
        futureDiv.appendChild(futureTemp);
        futureDiv.appendChild(futureWind);
        futureDiv.appendChild(futureHumidity);
    }
    
};
var saveSearch = function () {
    userInput = cityInputEl.value.trim();
    //console.log(cityInputEl.value.trim());
    localStorage.setItem('city-form', JSON.stringify(userInput));
};

var loadCityBtn = function () {
    for (var i = 0; i < 3; i++)
        var savedCity = localStorage.getItem('city-form')
        console.log(savedCity)
        var getForm = document.getElementById('city-form');

        var makeButton = document.createElement('button');
        makeButton.textContent = (savedCity);

        getForm.appendChild(makeButton);
}
// loadCityBtn(); 
// Celsius = Kelvin - 273.15
// Fahrenheit = Kelvin x 1.8 - 459.67
//console.log(latitude, longtitude)
// add event listener for the submit button 
cityFormEl = addEventListener('submit', formSubmitHandler);


