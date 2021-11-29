const button = document.querySelector('.button')
const currentCity = document.querySelector('#current-city')

button.addEventListener('click', getApi);

function getApi() {
    let city = currentCity.value;
    const APIKey = "2f710657032dbf024be6584bc8a359ee";
    const queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;
    fetch(queryURL) 
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(console.err)
}