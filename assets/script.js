var city;
var apiKey = "2f710657032dbf024be6584bc8a359ee";
var searchForm = document.querySelector("#search-form");
var previousSearches = $("#previous-searches");
var previousSearchesArray = [];
var searches = 0;
var todaysForecast = document.querySelector("#todays-forecast");
var todaysDate = dayjs().format("MM/DD");
var fiveDayForecast = document.querySelector("#five-day-forecast");
var fiveDayDisplay = "";
var fiveDayEls = document.querySelectorAll(".day");

// Clears out localstorage when the page loads
localStorage.clear();

// Adds event listener to the search form submit button
searchForm.addEventListener("submit", searchByCity);

// Passes the user's city name from the search form to other functions
function searchByCity (event) {
    // Prevents form from being submitted
    event.preventDefault();
    // Assigns the user's search input to the "city" variable
    var searchInput = document.querySelector("#user-input");
    city = searchInput.value;
    // If "city" variable exists
    if (city) {
        // Calls function for today's forecast for searched city
        todaysWeather(city);
        // Calls function for five day forecast for searched city
        fiveDayWeather(city);
        // Saves searches to an array
        previousSearchesArray.push(city);
        // Adds searches array to localstorage as a string
        localStorage.setItem("previousSearches", JSON.stringify(previousSearchesArray));
        searches = searches + 1;
        // Calls function to display previous searches
        displaySearches();
    }
}

// Takes previous searches from local storage & displays them as buttons to be clicked & searched again
function displaySearches () {
    // Clears out previous searches
    previousSearches.empty();
    // Looks into localstorage for previous searches
    var searchHistory = JSON.parse(localStorage.previousSearches);
    for (let i = 0; i < searchHistory.length; i++) {
        var pastSearch = searchHistory[i];
        // Creates buttons of previous searches
        var searchDisplay = document.createElement("button");
        searchDisplay.textContent = pastSearch;
        searchDisplay.setAttribute("class", "city-search-buttons");
        searchDisplay.setAttribute("id", pastSearch);
        previousSearches.append(searchDisplay);
        // Searches the city again if button is clicked
        searchDisplay.addEventListener("click", storedSearch);
    }
}

// Returns the weather forecast for a city that was previously searched and stored in localstorage
function storedSearch (event) {
    var city = event.target.getAttribute("id");
    if (city) {
        todaysWeather(city);
        fiveDayWeather(city);
    }
}

// Today's Weather for Searched City
function todaysWeather (city) {
    // Creates query URL using city name and API Key
    var queryURL =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=imperial" +
        "&appid=" +
        apiKey;

    // Clears out previous data 
    todaysForecast.textContent = "";
    fiveDayEls.textContent = "";
    fiveDayDisplay.textContent = "";

    // Uses query URL to fetch data
    fetch(queryURL).then(function (response) {
        response.json().then(function (data) {
            console.log(data);
            console.log(data.main.temp);

        // City & Today's Date
        var dateDisplay = document.createElement("h2");
        dateDisplay.textContent = city + " " + todaysDate;
        todaysForecast.append(dateDisplay);

        // Icons
        var weatherIcon = data.weather[0].icon;
        var iconDisplay = document.createElement("img");
        iconDisplay.width = 100;
        iconDisplay.height = 100;
        iconDisplay.setAttribute(
            "src",
            "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png"
        );
        todaysForecast.append(iconDisplay);

        // Temperature
        var tempDisplay = document.createElement("li");
        tempDisplay.textContent = "Temp: " + data.main.temp + "°F";
        todaysForecast.append(tempDisplay);
            
        // Wind Speed
        var windDisplay = document.createElement("li");
        windDisplay.textContent = "Wind: " + data.wind.speed + " MPH";
        todaysForecast.append(windDisplay);

        // Humidity
        var humidityDisplay = document.createElement("li");
        humidityDisplay.textContent = "Humidity: " + data.main.humidity + "%";
        todaysForecast.append(humidityDisplay);

        // Latitude and Longitude to get UV
        var lat = data.coord.lat;
        var lon = data.coord.lon;
        console.log(lat);
        console.log(lon);
        UV(lat, lon);
        });
    });
}

// Gets UV data and passes it back to today's weather forecast
function UV (lat, lon) {
    // Creates query URL using latitude and longitude and API Key
    var queryURL =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        lat +
        "&lon=" +
        lon +
        "&appid=" +
        apiKey;

    // Uses query URL to fetch data
    fetch(queryURL).then(function (response) {
        response.json().then(function (data) {
            console.log(data);

        // Displays UV data
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
        todaysForecast.append(uvDisplay);
        uvDisplay.append(uvDisplayNumber);
        });
    });
}

// Five Day Forecast for Searched City
function fiveDayWeather (city) {
    // Creates query URL using searched city and API Key
    var queryURL =
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
        city +
        "&units=imperial" +
        "&appid=" +
        apiKey;

    // Uses query URL to fetch data
    fetch(queryURL).then(function (response) {
        response.json().then(function (data) {
            console.log(data);

        // Displays five day forecast heading
        fiveDayDisplay = document.createElement("h2");
        fiveDayDisplay.textContent = "5-Day Forecast";
        fiveDayForecast.append(fiveDayDisplay);

        // Loops over html elements to display five day forecast
        for (let i = 0; i < 5; i++) {
            fiveDayEls[i].innerHTML = "";

        // Gets data and displays dates for five day forecast
        var forecastDay = dayjs()
            .add(i + 1, "day")
            .format("MM/DD");
        console.log(forecastDay);
        var forecastDayDisplay = document.createElement("h3");
        forecastDayDisplay.textContent = forecastDay;
        fiveDayEls[i].append(forecastDayDisplay);

        // Icons
        var weatherIcon = data.list[i].weather[0].icon;
        var iconDisplay = document.createElement("img");
        iconDisplay.width = 100;
        iconDisplay.height = 100;
        iconDisplay.setAttribute(
            "src",
            "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png"
        );
        fiveDayEls[i].append(iconDisplay);

        // Temperature
        var tempDisplay = document.createElement("li");
        tempDisplay.textContent = "Temp: " + data.list[i].main.temp + "°F";
        fiveDayEls[i].append(tempDisplay);

        // Wind
        var windDisplay = document.createElement("li");
        windDisplay.textContent = "Wind: " + data.list[i].wind.speed + " MPH";
        fiveDayEls[i].append(windDisplay);

        // Humidity
        var humidityDisplay = document.createElement("li");
        humidityDisplay.textContent =
        "Humidity: " + data.list[i].main.humidity + "%";
        fiveDayEls[i].append(humidityDisplay);
        }
    });
});
}