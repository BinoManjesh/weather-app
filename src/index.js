import "./style.css";

const button = document.querySelector("button#submit-area");
const area = document.querySelector("input#area");

button.addEventListener("click", () => getWeather(area.value));

area.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    button.click();
  }
});

const header = document.querySelector("div.weather-card > h2");
const condition = document.querySelector("div.weather-card > h3");
const img = document.querySelector("div.weather-card > img");
const temp = document.querySelector("div.weather-card > p");

function getWeather(area) {
  fetch(
    `http://api.weatherapi.com/v1/current.json?key=1a72c7b1d82845ed801143613241601&q=${area}`
  )
    .then((response) => {
      return response.json();
    })
    .then((weather) => {
      console.log(weather);
      if (weather.error) {
        if (weather.error.code == 1006) {
          //No such area
        } else {
          //Some other error
        }
        return;
      }
      updateWeatherCard(weather);
    });
}

function updateWeatherCard(weather) {
  header.textContent = weather.location.name + ", " + weather.location.country;
  condition.textContent = weather.current.condition.text;
  img.src = weather.current.condition.icon;
  temp.textContent = weather.current.temp_c + "	°C";
}
