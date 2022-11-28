var searchForm = document.getElementById("search-form");
var searchButton = document.getElementById("search-btn");
var citySearchInput = document.getElementById("city-search");
var todaysWeather = document.getElementById("todays");



function renderTodays(city, weather){
    var date = dayjs().format("M/D/YYYY");
    var temp = weather.wind.temp;
    var wind = weather.wind.speed;
    var humid = weather.main.humidity;
    var iconUrl = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`;
    // var iconAbout = weather.weather[0].description || weather[0].main;

    var container = document.createElement("div");
    var card = document.createElement("div");
    var headEl = document.createElement("h2");
    var iconEl = document.createElement("img");
    var tempEl = document.createElement("p");
    var windEl = document.createElement("p");
    var humidEl = document.createElement("p");

    container.append(card);

    headEl.textContent = `${city} (${date})`;
    iconEl.setAttribute("src", iconUrl);
    headEl.append(iconEl);
    tempEl.textContent = `Temp: ${temp}°F`;
    windEl.textContent = `Wind: ${wind} MPH`;
    humidEl.textContent = `Humidity: ${humid} %`;
    card.append(headEl, tempEl, windEl, humidEl);

    todaysWeather.append(container);

}


function renderWeather(city, data) {
    renderTodays(city, data.list[0], data.city.timezone);

}


function getWeather(location){
    var lat  = location.lat;
    var lon = location.lon;
    var city = location.name;
  
    var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=e2c5e14da0d6896d30552e334ed3c851`;
  
    fetch(apiUrl)
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        console.log(city, data);
        renderWeather(city, data);
      })
      .catch(function (err) {
        console.error(err);
      });
};




function getCoordinates(search) {
    var apiUrl =`https://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=e2c5e14da0d6896d30552e334ed3c851`
    
    fetch (apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data[0]);
            getWeather(data[0]);
        })
        .catch(function (err) {
            console.error(err);
          });

        
};




function submitSearch (event) {
    if (!citySearchInput.value) {
        return;
    }
    event.preventDefault();
    // var search = citySearchInput.value.trim();
    var search = citySearchInput.value.trim();
    console.log(search);
    getCoordinates(search);
    citySearchInput.value = '';



};


searchForm.addEventListener("submit", submitSearch);
