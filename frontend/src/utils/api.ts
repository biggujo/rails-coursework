import axios, { AxiosResponse } from 'axios';
import SignInDataInterface from '../interfaces';

axios.defaults.baseURL = 'http://localhost:5401'; // Rails

// For testing purposes
const getPing = async () => {
  try {
    const response: AxiosResponse = await axios.get('/pings');
    return response;
  } catch (e) {
    console.log(e);
  }
};

const signIn = async (data: SignInDataInterface) => {
  try {
    const response: AxiosResponse = await axios.post('/sign_in', {
      user: data,
    });

    return response;
  } catch (e) {
    console.log(e);
  }
};

const API = {
  debug: {
    getPing,
  },
  auth: {
    signIn,
  },
};

export default API;
