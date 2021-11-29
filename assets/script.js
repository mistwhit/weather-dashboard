const button = document.querySelector('.button')
const inputValue = document.querySelector('.inputValue')
const name = document.querySelector('.name')
const desc = document.querySelector('.description')
const temp = document.querySelector('.temperature')

let city = inputValue.value;
const APIKey = "2f710657032dbf024be6584bc8a359ee";
var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;


button.addEventListener('click', function() {
    fetch(queryURL) 
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(console.err)
})
