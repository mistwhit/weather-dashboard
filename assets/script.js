var city;
var searchForm = document.querySelector("#search-form");
var APIKey = "e256b571cb3fa1813dc8566aad393b43";
var pastSearches = $("#past-searches");
var pastSearchesKeywords = [];
var searches = 0;

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
        // Saves searches to an array
        pastSearchesKeywords.push(city);
        // Adds searches array to localstorage as a string
        localStorage.setItem("pastSearches", JSON.stringify(pastSearchesKeywords));
        searches = searches + 1;
        // Calls function to display past searches (see below)
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

function searchAgain(event) {
    var city = event.target.getAttribute("id");
    if (city) {
        console.log(city);
        // TODO: Pass city to OpenWeatherMap API
    }
}