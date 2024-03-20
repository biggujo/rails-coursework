import axios, { AxiosResponse } from 'axios';

axios.defaults.baseURL = 'http://localhost:5401'; // Rails

const getPing = async () => {
  try {
    const response: AxiosResponse = await axios.get('/pings');
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

const API = {
  getPing,
};

export default API;
