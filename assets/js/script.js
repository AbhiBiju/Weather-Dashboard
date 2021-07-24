//Get cityName from Search Input on SearchBtn Click
var cityInput = $("#cityName");
var searchBtn = $("#searchBtn");

// Search Weather Api with cityCoords
async function convertCity() {
  var cityValue = cityInput.val().replace(/\s/g, "+");
  console.log(cityValue);

  //  Convert cityName to cityCoords
  const cityToCoords = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${cityValue}&limit=1&appid=ca658b3681c8bcc081b9fb02fedb375d`
  );
  const coords = await cityToCoords.json();
  console.log(coords);

  var latCurrent = coords[0].lat;
  var lonCurrent = coords[0].lon;
  console.log(latCurrent);
  console.log(lonCurrent);

  const getWeather = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=ca658b3681c8bcc081b9fb02fedb375d`
  );

  const weather = await getWeather.json();
  console.log(weather);

  const getFullWeather = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${latCurrent}&lon=${lonCurrent}&appid=ca658b3681c8bcc081b9fb02fedb375d`
  );

  const fullWeather = await getFullWeather.json();
  console.log(fullWeather);

  //  Update City Name and Date (Weather Based Icon)
  var cityTitle = $("#currCity");
  var currDate = $("#currDate");
  var weatherImg = $("#wicon");

  cityTitle.text(weather.name);

  var today = moment(weather.dt, "X").format("(M/DD/YYYY)");
  currDate.text(today);

  var iconUrl = `http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`;
  weatherImg.attr("src", iconUrl);

  //  Update Temp Wind Humid
  var temp = $("#temp");
  var calcTemp = Math.round(((parseInt(weather.main.temp) - 273.15) * 9) / 5 + 32);

  temp.text(calcTemp);

  var wind = $("#wind");
  wind.text(weather.wind.speed);

  var humid = $("#humid");
  humid.text(weather.main.humidity);

  //  Update UV Index and add bg success warning danger after evaluating

  var uvIndex = $("#uvIndex");
  var uvi = fullWeather.current.uvi;
  if (uvi <= 2) {
    var uvBtn = $('<button class="btn btn-success text-white">');
    uvBtn.text(uvi);
    uvIndex.html(uvBtn);
  } else if (uvi >= 3 && uvi <= 5) {
    var uvBtn = $('<button class="btn btn-warning text-white">');
    uvBtn.text(uvi);
    uvIndex.html(uvBtn);
  } else if (uvi >= 6) {
    var uvBtn = $('<button class="btn btn-danger text-white">');
    uvBtn.text(uvi);
    uvIndex.html(uvBtn);
  }
}

// Save cityName to localStorage
var savedCities = JSON.parse(localStorage.getItem("savedCities")) || [];

function saveTheCity() {
  //  Add new Button with current City Name as text and value
  var thisCity = cityInput.val().replace(/\s/g, "+");
  if (thisCity != "") {
    savedCities.unshift(thisCity);
  } else {
    cityInput.attr("placeholder", "Please Enter A City");
  }
  localStorage.setItem("savedCities", JSON.stringify(savedCities));
}

function renderCities() {
  var getHistory = $("#searchHistory");
  getHistory.empty();

  for (city of savedCities) {
    var newBtn = $(`<button class="btn btn-secondary fs-4 w-100 my-1 d-flex justify-content-between">`);
    var closeBtn = $(`<button type="button" class="btn-close" aria-label="Close">`);
    newBtn.text(city);
    newBtn.append(closeBtn);
    getHistory.append(newBtn);
  }
}
renderCities();

var savedBtns = $('button[class*="btn-secondary"]');
var closeThis = $('button[class*="btn-close"]');

console.log("first");
console.log(savedBtns);
console.log(closeThis);

searchBtn.click(() => {
  convertCity();
  saveTheCity();
  renderCities();

  savedBtns = $('button[class*="btn-secondary"]');
  closeThis = $('button[class*="btn-close"]');
  console.log("second");
  console.log(savedBtns);
  console.log(closeThis);
});

closeThis.click((event) => {
  var thisCity = event.target;
  var parentEl = thisCity.parentElement;

  console.log("third");
  console.log(savedBtns);
  console.log(closeThis);

  console.log(parentEl.innerText);
  for (var i = 0; i < savedCities.length; i++) {
    if (parentEl.innerText === savedCities[i]) {
      savedCities.splice(i, 1);
    }
  }
  localStorage.setItem("savedCities", JSON.stringify(savedCities));
  console.log(thisCity);
  console.log(parentEl);
  parentEl.remove();
});

savedBtns.click((event) => {
  var savedCity = event.target.innerText;
  console.log(savedCity);
});

//5 Day foreCast
// Get 5day data
// Make new card for each day in data
// Render card Date
// Render Icon based on Weather
// Render Temp Wind Humid for each date

//Local Storage for Previous Searches
// event.target for the clicked button
// on click run the search and update function
// pass in the button.value as cityName
