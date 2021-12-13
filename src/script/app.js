const apiKey = `70e67d3998df6d2db5e89f3233c0e8d6`;
const ForeCast = document.querySelector(`.forecast`);
const CurrentCondition = document.querySelector(`.current-conditions`);

navigator.geolocation.getCurrentPosition((position) => {
  getData(position.coords.latitude, position.coords.longitude).then((data) => {
    const icon = data.weather[0].icon;
    const tempearture = data.main.temp;
    const condition = data.weather[0].description;
    currentConditionHtml(tempearture, icon, condition);
  });
  getWeather(position.coords.latitude, position.coords.longitude).then(
    (data) => {
      let first = 0;
      let last = 8;

      data.list.forEach((item) => {
        if (last <= 40) {
          const weatherData = data.list.slice(first, last);

          const temperature = weatherData[2].main.temp;
          const icon = weatherData[2].weather[0].icon;
          const description = weatherData[2].weather[0].description;
          const highTemp = weatherData
            .map((item) => item.main.temp_max)
            .sort()[0];
          const lowTemp = weatherData
            .map((item) => item.main.temp_min)
            .sort((a, b) => b - a)[0];

          first = last;
          last = last + 8;
          const weekday = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ];
          const d = new Date(weatherData[2].dt_txt);
          let weekDays = weekday[d.getDay()];

          fiveDayForeCastHtml(icon, weekDays, highTemp, lowTemp, description);
        }
      });
    }
  );
});
const getData = async function (latitude, longitude) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
const getWeather = async function (latitude, longitude) {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
  const response = await fetch(weatherUrl);
  const data = await response.json();
  return data;
};
function currentConditionHtml(temperature, icon, condition) {
  CurrentCondition.insertAdjacentHTML(
    `beforeend`,
    `<h2>Current Conditions</h2>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" />
        <div class="current">
          <div class="temp">${
            temperature.toFixed(0) - (273.15).toFixed(0)
          }&#8451;</div>
          <div class="condition">${condition}</div>
        </div>`
  );
}
function fiveDayForeCastHtml(icon, weekDays, highTemp, lowTemp, description) {
  ForeCast.insertAdjacentHTML(
    `beforeend`,
    ` <div class="day">
          <h3>${weekDays}</h3>
          <img src="https://openweathermap.org/img/wn/${icon}@2x.png" />
          <div class="description">${description}</div>
          <div class="temp">
            <span class="high">${
              highTemp.toFixed(0) - (273.15).toFixed(0)
            }</span>/<span class="low">${
      lowTemp.toFixed(0) - (273.15).toFixed(0)
    }</span>
          </div>
        </div>`
  );
}
