import axios, { AxiosResponse } from 'axios';
import {
  ChatEntity,
  ChatMessage,
  PasswordRecoveryFormData,
  User,
  UserSignInFormAPI,
} from '../interfaces';
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

export interface FetchPreviousMessagesResponse {
  metadata: {
    last: number;
  };
  items: Array<ChatMessage>;
  private_chat_id: number;
}

const messages = {
  fetchPrevious: async ({
    chatId,
    page,
    offset,
  }: {
    chatId: number;
    page?: number;
    offset?: number;
  }) => {
    const params = new URLSearchParams({});

    if (page) {
      params.set('page', String(page));
    }

    if (offset) {
      params.set('offset', String(offset));
    }

    const response: AxiosResponse = await axios.get(
      `/private_chats/${chatId}/messages?${params}`
    );

    return response.data as FetchPreviousMessagesResponse;
  },
};

const chats = {
  fetchAll: async () => {
    const response: AxiosResponse = await axios.get(`/private_chats`);

    return response.data as Array<ChatEntity>;
  },
};

const passwordRecovery = {
  request: async (email: string) => {
    const data = {
      user: {
        email,
      },
    };

    const response: AxiosResponse = await axios.post('/password/reset', data);

    return response.data as { message: string };
  },
  reset: async (
    data: PasswordRecoveryFormData & { reset_password_token: string }
  ) => {
    const properData = {
      user: data,
    };

    const response: AxiosResponse = await axios.patch('/password', properData);

    return response.data as { message: string };
  },
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
  messages: messages,
  chats,
  passwordRecovery,
  webSocket: {
    URL: 'ws://localhost:5401/cable',
  },
};

export default API;
