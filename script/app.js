const apiKey = `70e67d3998df6d2db5e89f3233c0e8d6`;
navigator.geolocation.getCurrentPosition((position) => {
  getData(position.coords.latitude, position.coords.longitude).then((data) => {
    // console.log(data);
    const icon = data.weather[0].icon;
    const tempearture = data.main.temp;
    const condition = data.weather[0].description;
    currentConditionHtml(tempearture, icon, condition);
  });
  getWeather(position.coords.latitude, position.coords.longitude).then(
    (data) => {
      let first = 0;
      let last = 8;
      // console.log(data);
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
          console.log(lowTemp);
          // console.log(temperature);
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
          const d = new Date();
          let weekDays = weekday[d.getDay()];
          // console.log(weekDays);
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
  console.log(data);
  return data;
};