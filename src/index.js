import "./style.css";

const button = document.querySelector("button#submit-area");
const area = document.querySelector("input#area");

button.addEventListener("click", () => getWeather(area.value));

area.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    button.click();
  }
});

const card = document.querySelector("div.weather-card");
const [header, condition, img, temp] = card.children;
const error = document.querySelector("div.error");

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
        handleError(weather.error.code);
        return;
      }
      updateWeatherCard(weather);
    });
}

function handleError(code) {
  card.classList.add("invisible");
  let errorMessage = "Something went wrong :(";
  if (code == 1006) {
    errorMessage = "No such area!";
  }
  error.textContent = errorMessage;
  error.classList.remove("invisible");
}

function updateWeatherCard(weather) {
  error.classList.add("invisible");
  header.textContent = weather.location.name + ", " + weather.location.country;
  condition.textContent = weather.current.condition.text;
  img.src = weather.current.condition.icon;
  temp.textContent = weather.current.temp_c + "	°C";
  card.classList.remove("invisible");
}
