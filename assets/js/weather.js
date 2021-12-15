// leave space for querySelectors



// api key is b3e2bf242500fea051a4efa17da1cf49
// api structure is api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// create the function that fetches the data from the third party api
var getWeatherRepos = function (city) {
    // format the open weather api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=b3e2bf242500fea051a4efa17da1cf49";

    // make a request to the url
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayWeather(data, city);
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
        getWeatherRepos(city);
        cityInputEl.value = '';
    } else {
        alert('Please enter a city Name');
    }
    console.log(event);
};

// add event listener for the submit button 
cityFormEl = addEventListener('submit', formSubmitHandler);