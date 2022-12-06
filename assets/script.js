var searchForm = document.getElementById("search-form");
var searchButton = document.getElementById("search-btn");
var citySearchInput = document.getElementById("city-search");
var todaysWeather = document.getElementById("todays");
var futureDays = document.getElementById("future-days");



function renderTodays(city, weather){
    var date = dayjs().format("M/D/YYYY");
    var temp = weather.main.temp;
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

    card.setAttribute("style", "border: solid black 3px");
    headEl.textContent = `${city} (${date})`;
    iconEl.setAttribute("src", iconUrl);
    headEl.append(iconEl);
    tempEl.textContent = `Temp: ${temp}°F`;
    windEl.textContent = `Wind: ${wind} MPH`;
    humidEl.textContent = `Humidity: ${humid} %`;
    card.append(headEl, tempEl, windEl, humidEl);

    todaysWeather.append(container);

}

function renderFutureCard(forecast) {
  var temp = forecast.main.temp;
  var wind = forecast.wind.speed;
  var humid = forecast.main.humidity;
  var iconUrl = `https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`;
  // var iconAbout = weather.weather[0].description || weather[0].main;

  var column = document.createElement("div");
  var card = document.createElement("div");
  var cardContent = document.createElement("div");
  var headEl = document.createElement("h2");
  var iconEl = document.createElement("img");
  var tempEl = document.createElement("p");
  var windEl = document.createElement("p");
  var humidEl = document.createElement("p");

  column.append(card);
  card.append(cardContent);
  cardContent.append(headEl, iconEl, tempEl, windEl, humidEl );

  column.setAttribute("class", "col-md-2");
  card.setAttribute("class", "card bg-secondary forecast-card");
  headEl.textContent = dayjs(forecast.dt_txt).format("M/D/YYYY");
  iconEl.setAttribute("src", iconUrl);
  tempEl.textContent = `Temp: ${temp}°F`;
  windEl.textContent = `Wind: ${wind} MPH`;
  humidEl.textContent = `Humidity: ${humid} %`;

  futureDays.append(column);

}


function renderFiveDay(dailyData) {
  var startPoint = dayjs().add(1, 'day').startOf('day').unix();
  var endPoint = dayjs().add(6, 'day').startOf('day').unix();
  var headerColumn = document.createElement('div');
  var header = document.createElement('h4');

  headerColumn.setAttribute("class", "col-12");
  header.textContent = "5-day Forecast:";
  headerColumn.append(header);

  futureDays.innerHTML = "";
  futureDays.append(headerColumn);

  for (var i = 0; i < dailyData.length; i++) {
    if (dailyData[i].dt >= startPoint && dailyData[i].dt < endPoint) {
      if (dailyData[i].dt_txt.slice(11,13) == "12"){
      console.log(dailyData[i]);
      renderFutureCard(dailyData[i]);}
    }
  }

}


function renderWeather(city, data) {
    renderTodays(city, data.list[0], data.city.timezone);
    renderFiveDay (data.list);

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
