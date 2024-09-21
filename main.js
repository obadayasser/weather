document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "f10bb17eefa1e8a8644220838c8fd806";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

    const searchBox = document.querySelector(".search input");
    const searchBtn = document.querySelector(".search button");
    const weatherIcon = document.querySelector(".weather-icon");

    async function checkWeather(city) {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        const data = await response.json();
        console.log(data);
        
        if (data.cod === 200) {
            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").innerHTML = Math.round(data.main.humidity) + "%"; // تأكد من استخدام .humidity
            document.querySelector(".wind").innerHTML = Math.round(data.wind.speed) + " km/h";
            
            if (data.weather[0].main.toLowerCase() === "clouds") {
                weatherIcon.src = "images/cloud.png";
            } else if (data.weather[0].main.toLowerCase() === "clear") {
                weatherIcon.src = "images/sun.png";
            } else if (data.weather[0].main.toLowerCase() === "rain") {
                weatherIcon.src = "images/rain.png";
            }
        } else {
            alert("City not found. Please try again.");
        }
    }

    searchBtn.addEventListener("click", () => {
        checkWeather(searchBox.value);
    });
});
