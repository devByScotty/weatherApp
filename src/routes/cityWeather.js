import axios from 'axios';

const API_URL = 'https://api.openweathermap.org/data/2.5/forecast';
const API_KEY = '8f06608840086f808d5eae98c9824efa';
const days =7;

 const getForecastData = async (city) => {
  try {
    const response = await axios.get(`${API_URL}?q=${city}&cnt=${days}&units=metric&appid=${API_KEY}`);
    console.log(response.data)
    return response.data;
    
  } catch (error) {
    throw error;
  }
};

export default getForecastData;
