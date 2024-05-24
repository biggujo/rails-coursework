import axios, { AxiosResponse } from 'axios';
import { User, UserSignInFormAPI } from '../interfaces';
import UserSignUpFormAPI from '../interfaces/UserSignUpFormAPI.ts';

axios.defaults.baseURL = 'http://localhost:5401'; // Rails

const signUp = async (data: UserSignUpFormAPI) => {
  const response: AxiosResponse = await axios.post('/sign_up', {
    user: data,
  });

  return response;
};

const signIn = async (data: UserSignInFormAPI) => {
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
  return response.data;
};

const refreshUser = async () => {
  const response: AxiosResponse = await axios.get('/users/refresh');
  return response.data as User;
};

const getAllUsers = async () => {
  const response: AxiosResponse = await axios.get('/users');
  return response.data as {
    data: Array<User>;
  };
};

const API = {
  auth: {
    signIn,
    signUp,
    signOut,
    refreshUser,
  },
  profile: {
    getProfile,
  },
  user: {
    getAll: getAllUsers,
  },
  webSocket: {
    URL: 'ws://localhost:5401/cable',
  },
};

export default API;
