const button = document.querySelector(".button")
const currentCity = document.querySelector("#city-search-input");
const apiKey = "2f710657032dbf024be6584bc8a359ee"; 

function getApi() {
    var requestUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + currentCity + "&appid=" + apiKey;
    fetch(requestUrl) 
        .then(function (response)  {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        })
        .catch(function (err) {
            console.log(err);
        })
}

button.addEventListener('click', getApi);