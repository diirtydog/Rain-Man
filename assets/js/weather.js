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
                getWeatherRepos(data, city)
            })
        }
    })
    console.log(city.coord.lon);
   
};

var getWeatherRepos = function (lat, lon) {
    //console.log
    // format the open weather api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude={part}&appid=b3e2bf242500fea051a4efa17da1cf49";

    // make a request to the url
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayWeather(data, lat, lon);
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

    if (city) {
        getLongLat(city);
        cityInputEl.value = '';
    } else {
        alert('Please enter a city Name');
    }
    console.log(event);
};
// display weather cards
var displayWeather = function(city, searchTerm) {
    // check if we pulled weather data
    if (city.length === 0) {
        weatherContainerEl.textContent = "City not found.";
        return;
    }
    weatherContainerEl.textContent = "";
    weatherSearchTerm.textContent = searchTerm;
    // loop over weather data
    for (var i = 0; i < city.length; i++) {
        
    }
    console.log(city);
    console.log(searchTerm);
}
//console.log(latitude, longtitude)
// add event listener for the submit button 
cityFormEl = addEventListener('submit', formSubmitHandler);


