import { GOOGLE_PLACES_API_KEY } from '@env';


export const fetchCoordsFromAddress = async (address) => {
    const apiKey = GOOGLE_PLACES_API_KEY;
    const geocodingApi = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${encodeURIComponent(apiKey)}`;
    const response = await fetch(geocodingApi);
    const data = await response.json();
    
    if (data && data.results && data.results.length > 0) {
      return {
        latitude: data.results[0].geometry.location.lat,
        longitude: data.results[0].geometry.location.lng,
      };
    } else {
      throw new Error('Unable to fetch coordinates for the given address.');
    }
  };