
import {OPEN_WEATHER_MAP_API_KEY } from '@env';

export const fetchWeatherData = async (latitude, longitude) => {
    const apiKey = OPEN_WEATHER_MAP_API_KEY; 
    const endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    
    const response = await fetch(endpoint);
    const data = await response.json();
    
    if (data && data.main) {
      return data;
    } else {
      throw new Error('Unable to fetch weather data.');
    }
  }