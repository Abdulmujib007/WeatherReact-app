import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;
const apiKey = import.meta.env.VITE_API_KEY;

const getCityData = (city) => `${baseUrl}=${city}&APPID=${apiKey}`;

export const getAll = async (city) => {
  const response = await axios.get(getCityData(city));
  return response.data;
};
