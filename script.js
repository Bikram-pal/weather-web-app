document.addEventListener("DOMContentLoaded",()=>{
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const cityName = document.getElementById("city-name");
  const temperature = document.getElementById("temperature");
  const description = document.getElementById("description");
  const weatherInfo = document.getElementById("weather-info");
  const errorMessage = document.getElementById("error-message");

  getWeatherBtn.addEventListener("click", async ()=>{
    const city = cityInput.value.trim();
    if(!city) return;

    // it may throw an error
    // server/database is always in another continent
    
    try{
      const weatherData = await fetchWeatherData(city)
      displayWeatherData(weatherData)
    }catch(error){
      showError()
    }

  })

  const API_KEY = "8d841353acbc2016ab5a28ae3974d6df";

  async function fetchWeatherData(city){
    // gets the data
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    
    const response =  await fetch(url);
    const data = response.json();
    
    if(!response.ok){
      throw new Error("city not found");
    }
    
    
    return data;
  }

  function displayWeatherData(data){
    // display the weather
    const {weather, main, name} = data
    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden")
    console.log(data);
    
    cityName.textContent = name;
    temperature.textContent = `Temperature: ${main.temp}`;
    description.textContent = `Description: ${weather[0].description}`;

    

  }

  function showError(){
    weatherInfo.classList.add("hidden")
    errorMessage.classList.remove("hidden")
  }

})