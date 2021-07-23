//Get cityName from Search Input on SearchBtn Click
var cityInput = $("#cityName");
var searchBtn = $("#searchBtn");

// Search Weather Api with cityCoords
async function convertCity() {
  var cityValue = cityInput.val().replace(/\s/g, "");
  console.log(cityValue);
  
  // Save cityName to localStorage
  //  Add new Button with current City Name as text and value
  
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
    `https://api.openweathermap.org/data/2.5/onecall?lat=${latCurrent}&lon=${lonCurrent}&appid=ca658b3681c8bcc081b9fb02fedb375d`
  );

  const weather = await getWeather.json();
  console.log(weather);

  //  Update City Name and Date (Weather Based Icon)
  //  Update Temp Wind Humid
  //  Update UV Index and add bg success warning danger after evaluating
}

searchBtn.click(() => {
  convertCity();
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
