import "./style.css";

const button = document.querySelector("button#submit-area");
const area = document.querySelector("input#area");

const card = document.querySelector("div.weather-card");
const [header, condition, img, temp] = card.children;
const error = document.querySelector("div.error");
const loading = document.querySelector("div.loading");

button.addEventListener("click", () => {
  getWeather(area.value);
  card.classList.add("invisible");
  error.classList.add("invisible");
  loading.classList.remove("invisible");
});

area.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    button.click();
  }
});

function getWeather(area) {
  fetch(
    `https://api.weatherapi.com/v1/current.json?key=1a72c7b1d82845ed801143613241601&q=${area}`,
    { mode: "cors" }
  )
    .then((response) => {
      loading.classList.add("invisible");
      return response.json();
    })
    .then((weather) => {
      if (weather.error) {
        handleError(weather.error.code);
        return;
      }
      updateWeatherCard(weather);
    });
}

function handleError(code) {
  let errorMessage = "Something went wrong :(";
  if (code == 1006) {
    errorMessage = "No such area!";
  }
  error.textContent = errorMessage;
  error.classList.remove("invisible");
}

function updateWeatherCard(weather) {
  header.textContent = weather.location.name + ", " + weather.location.country;
  condition.textContent = weather.current.condition.text;
  img.src = weather.current.condition.icon;
  temp.textContent = weather.current.temp_c + "	°C";
  card.classList.remove("invisible");
}
