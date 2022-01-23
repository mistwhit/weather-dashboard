var city;
var searchForm = document.querySelector("#search-form");
var searchBtn = document.querySelector("#search-button");
var APIKey = "e256b571cb3fa1813dc8566aad393b43";
var todayForecast = document.querySelector("#today-forecast");
var todayDate = dayjs().format("MM/DD/YYYY");
var fiveDayForecastEls = document.querySelectorAll(".day-forecast");
var fiveDayDiv = document.querySelector("#five-day-forecast");
var pastSearches = $("#past-searches");
var searches = 0;
var pastSearchesKeywords = [];
var fiveDayDisplay = "";

localStorage.clear();

// Search Form - Event Listener
searchForm.addEventListener("submit", citySearch);

// Search Form - Will Pass City Name to Weather API (Eventually)
function citySearch (event) {
    // Prevents form from being submitted
    event.preventDefault();
    // Assigns the user's search input to the "city" variable
    var searchInput = document.querySelector("#city-search-input");
    city = searchInput.value;
    // If "city" variable exists, log it to the console for testing
    if (city) {
        console.log(city);
    }
}