import axios, { AxiosResponse } from 'axios';
import { UserFormAPI } from '../interfaces';

axios.defaults.baseURL = 'http://localhost:5401'; // Rails

const setBearerToken = (bearer: string) => {
  axios.defaults.headers.common.Authorization = bearer;
};

const clearBearerToken = () => {
  axios.defaults.headers.common.Authorization = '';
};

// For testing purposes
const getPing = async () => {
  try {
    const response: AxiosResponse = await axios.get('/pings');
    return response;
  } catch (e) {
    console.log(e);
  }
};

const signIn = async (data: UserFormAPI) => {
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
    setBearerToken,
    clearBearerToken,
    signIn,
  },
};

export default API;
