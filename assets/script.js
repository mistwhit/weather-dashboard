var city;
var APIKey = "e256b571cb3fa1813dc8566aad393b43";
var searchForm = document.querySelector("#search-form");
var pastSearches = $("#past-searches");
var pastSearchesKeywords = [];
var searches = 0;
var todayForecast = document.querySelector("#today-forecast");
var todayDate = dayjs().format("MM/DD/YYYY");

// Clears out localstorage when the page loads
localStorage.clear();

// Adds event listener to the search form submit button
searchForm.addEventListener("submit", citySearch);

// Passes the user's city name from the search form to other functions
function citySearch (event) {
    // Prevents form from being submitted
    event.preventDefault();
    // Assigns the user's search input to the "city" variable
    var searchInput = document.querySelector("#user-input");
    city = searchInput.value;
    // If "city" variable exists
    if (city) {
        // Calls function for today's forecast for searched city
        forecastWeather(city);
        // Saves searches to an array
        pastSearchesKeywords.push(city);
        // Adds searches array to localstorage as a string
        localStorage.setItem("pastSearches", JSON.stringify(pastSearchesKeywords));
        searches = searches + 1;
        // Calls function to display past searches
        displaySearches();
    }
}

// Takes past searches from local storage & displays them as buttons to be clicked & searched again
function displaySearches() {
    // Clears out past searches
    pastSearches.empty();
    // Looks into localstorage for past searches
    var searchHistory = JSON.parse(localStorage.pastSearches);
    for (let i = 0; i < searchHistory.length; i++) {
        var pastSearch = searchHistory[i];
        // Creates buttons of past searches
        var searchDisplay = document.createElement("button");
        searchDisplay.textContent = pastSearch;
        searchDisplay.setAttribute("class", "city-search-buttons");
        searchDisplay.setAttribute("id", pastSearch);
        // Logs the past searches to the console for testing
        console.log(pastSearch);
        pastSearches.append(searchDisplay);
        // Searches the city again if button is clicked
        searchDisplay.addEventListener("click", searchAgain);
    }
}

// Returns the weather forecast for a city that was previously searched
function searchAgain(event) {
    var city = event.target.getAttribute("id");
    if (city) {
        console.log(city);
        forecastWeather(city);
    }
}

// Today's Weather for Searched City
function forecastWeather(city) {
    // Creates query URL using city name and API Key
    var queryURL =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=imperial" +
        "&appid=" +
        APIKey;

    // Clears out previous data 
    todayForecast.textContent = "";

    // Uses query URL to fetch data
    fetch(queryURL).then(function (response) {
        response.json().then(function (data) {
            console.log(data);
            console.log(data.main.temp);

        // City & Today's Date
        var dateDisplay = document.createElement("h2");
        dateDisplay.textContent = city + " " + todayDate;
        todayForecast.append(dateDisplay);

        // Icons
        var weatherIcon = data.weather[0].icon;
        var iconDisplay = document.createElement("img");
        iconDisplay.width = 100;
        iconDisplay.height = 100;
        iconDisplay.setAttribute(
            "src",
            "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png"
        );
        todayForecast.append(iconDisplay);

        // Temperature
        var tempDisplay = document.createElement("li");
        tempDisplay.textContent = "Temp: " + data.main.temp + "°F";
        todayForecast.append(tempDisplay);
            
        // Wind Speed
        var windDisplay = document.createElement("li");
        windDisplay.textContent = "Wind: " + data.wind.speed + " MPH";
        todayForecast.append(windDisplay);

        // Humidity
        var humidityDisplay = document.createElement("li");
        humidityDisplay.textContent = "Humidity: " + data.main.humidity + "%";
        todayForecast.append(humidityDisplay);

        // Latitude and Longitude to get UV
        var lat = data.coord.lat;
        var lon = data.coord.lon;
        console.log(lat);
        console.log(lon);
        getUV(lat, lon);
        });
    });
}

// Get UV data and pass it back to today's weather forecast
function getUV(lat, lon) {
    // Creates query URL using latitude and longitude and API Key
    var queryURL =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        lat +
        "&lon=" +
        lon +
        "&appid=" +
        APIKey;

    // Uses query URL to fetch data
    fetch(queryURL).then(function (response) {
        response.json().then(function (data) {
            console.log(data);

        // Adds UV data as a list item
        var uvDisplay = document.createElement("li");
        var uvDisplayNumber = document.createElement("span");
        uvDisplay.textContent = "UV Index: ";
        uvDisplayNumber.textContent = data.current.uvi;

        // Displays different colors based on UV data
        if (data.current.uvi < 4) {
            uvDisplayNumber.setAttribute("class", "favorable");
        } else if (data.current.uvi < 8) {
            uvDisplayNumber.setAttribute("class", "moderate");
        } else {
            uvDisplayNumber.setAttribute("class", "severe");
        }

        // Appends UV data to today's weather forecast for searched city
        todayForecast.append(uvDisplay);
        uvDisplay.append(uvDisplayNumber);
        });
    });
}