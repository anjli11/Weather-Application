const input = document.querySelector(".input-box");
const search = document.getElementById("search");
const weather_img = document.querySelector(".weather-image");
const temperature = document.querySelector(".temperature");
const description =  document.querySelector(".description");
const humidity = document.getElementById("humidity_value");
const wind = document.getElementById("wind_value");
const location_not_found=document.querySelector(".error");
const weather_body = document.querySelector(".weather-body");
const weather_detail = document.querySelector(".weather-detail");

async function checkweather(city){
    const api_key="ed2c3cfa4036270ab4c8721d12a21000"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;


    const weather_data= await fetch(`${url}`).then(response=>response.json());


    if( weather_data.cod==='404'){
      location_not_found.style.display="flex";
      weather_body.style.display = "none"; // Hide weather body
      weather_detail.style.display = "none"; // Hide weather details
     return;

    }

    location_not_found.style.display = "none";
    weather_body.style.display="flex";
    weather_detail.style.display="flex"
    temperature.innerHTML = `${Math.round( weather_data.main.temp - 273.15)}<sup>°C</sup>`;
    description.innerHTML = `${weather_data.weather[0].description}`;
    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind.innerHTML = `${weather_data.wind.speed}Km/h`;


   switch (weather_data.weather[0].main.toLowerCase()) {
     case "clouds":
       weather_img.src = "./assets/cloud.png";
       break;
     case "clear":
       weather_img.src = "./assets/clear.png";
       break;
     case "mist":
       weather_img.src = "./assets/mist.png";
       break;
     case "rain":
       weather_img.src = "./assets/rain.png";
       break;
     case "snow":
       weather_img.src = "./assets/snow.png";
       break;
   }
}

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkweather(input.value);
  }
});

search.addEventListener('click' , ()=>{
    checkweather(input.value)
})

