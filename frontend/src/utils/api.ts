import axios, { AxiosResponse } from 'axios';
import { UserFormAPI } from '../interfaces';

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

const signIn = async (data: UserFormAPI) => {
  const response: AxiosResponse = await axios.post('/sign_in', {
    user: data,
  });

  return response;
};

const signOut = async () => {
  const response: AxiosResponse = await axios.delete('/sign_out');

  return response;
};

const getProfile = async () => {
  const response: AxiosResponse = await axios.get('/users/profile');
  return response;
};

const API = {
  debug: {
    getPing,
  },
  auth: {
    signIn,
    signOut,
  },
  profile: {
    getProfile,
  },
};

export default API;
