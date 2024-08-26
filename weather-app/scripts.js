const apiKey = "7a79fa6ddc5353d31e36f25278543249";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";
const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");

async function checkWeather(city) {
    const response = await fetch(apiUrl + `&appid=${apiKey}` + `&q=${city}`);

    if(response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        let data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + " °C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
    
        if(data.weather[0].main == "Clouds") {
            document.querySelector(".weather-icon").src = "_img/clouds.png";
        }
        else if(data.weather[0].main == "Clear") {
            document.querySelector(".weather-icon").src = "_img/clear.png";
        }
        else if(data.weather[0].main == "Drizzle") {
            document.querySelector(".weather-icon").src = "_img/dizzle.png";
        }
        else if(data.weather[0].main == "Humidity") {
            document.querySelector(".weather-icon").src = "_img/humidity.png";
        }
        else if(data.weather[0].main == "Mist") {
            document.querySelector(".weather-icon").src = "_img/mist.png";
        }
        else if(data.weather[0].main == "Rain") {
            document.querySelector(".weather-icon").src = "_img/rain.png";
        }
        else if(data.weather[0].main == "Snow") {
            document.querySelector(".weather-icon").src = "_img/snow.png";
        }
    
        document.querySelector(".error").style.display = "none";
        document.querySelector(".weather").style.display = "block";
        //console.log(data);
    
    }

}

searchButton.addEventListener("click", () => {
    checkWeather(searchBox.value);
});



