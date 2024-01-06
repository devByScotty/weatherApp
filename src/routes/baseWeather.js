import axios from 'axios';

const API_KEY = '8f06608840086f808d5eae98c9824efa';
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';



 const getWeatherData = async (city) => {
  try {
    const response = await axios.get(`${API_BASE_URL}?q=${city}&units=metric&appid=${API_KEY}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export default getWeatherData;






