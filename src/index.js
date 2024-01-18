const button = document.querySelector("button#submit-area");
const area = document.querySelector("input#area");
const img = document.querySelector("img");

button.addEventListener("click", () => getWeather(area.value));

area.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    button.click();
  }
});

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
      img.src = weather.current.condition.icon;
    });
}
