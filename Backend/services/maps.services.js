const axios = require('axios');

const getAddressCoordinates = async (address) => {
  try {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const encodedAddress = encodeURIComponent(address);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;

    const response = await axios.get(url);

    if (response.data.results.length > 0) {
      const location = response.data.results[0].geometry.location;
      return {
        latitude: location.lat,
        longitude: location.lng,
      };
    }

    throw new Error("No results found for the given address");
  } catch (error) {
    throw new Error(`Failed to get coordinates: ${error.message}`);
  }
};

const getDistanceTime=async(origin,destination)=>{
  try {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    const response = await axios.get(url);

    if (response.data.status === 'OK' && response.data.rows[0].elements[0].status === 'OK') {
      const element = response.data.rows[0].elements[0];
      return {
        distance: element.distance.text,
        duration: element.duration.text
      };
    }

    throw new Error('Unable to calculate distance and time');
  } catch (error) {
    throw new Error(`Failed to get distance and time: ${error.message}`);
  }
}

const getPlaceSuggestions = async (input) => {
  if (!input) {
    throw new Error('query is required');
}

const apiKey = process.env.GOOGLE_MAPS_API_KEY;
const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

try {
    const response = await axios.get(url);
    if (response.data.status === 'OK') {
        return response.data.predictions.map(prediction => prediction.description).filter(value => value);
    } else {
        throw new Error('Unable to fetch suggestions');
    }
} catch (err) {
    console.error(err);
    throw err;
}
};
module.exports = {
  getAddressCoordinates,
  getDistanceTime,
  getPlaceSuggestions
};
