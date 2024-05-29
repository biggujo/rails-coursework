import axios, { AxiosResponse } from 'axios';
import {
  ChatEntity,
  ChatMessage,
  PasswordRecoveryFormData,
  UserEntityExtended,
  UserSignInFormAPI,
} from '../interfaces';
import UserSignUpFormAPI from '../interfaces/UserSignUpFormAPI.ts';
import { ProfileUpdateFormAPI } from '../interfaces/ProfileUpdateFormAPI.ts';
import UserEntity from '../interfaces/UserEntity.interface.ts';

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

const getById = async (id: number) => {
  const response: AxiosResponse = await axios.get(`/users/${id}`);
  return response.data;
};

const updateById = async (data: ProfileUpdateFormAPI) => {
  // FormData is needed to correctly send files
  const formData = new FormData();

  for (const key in data) {
    // @ts-expect-error because TS doesn't know about Blob serialization
    formData.append(key, data[key as keyof ProfileUpdateFormAPI]);
  }

  const response: AxiosResponse = await axios.patch(
    `/users/${data.id}`,
    {
      user: data,
    },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return response.data as UserEntityExtended;
};

const refreshUser = async () => {
  const response: AxiosResponse = await axios.get('/refresh');
  return response.data as UserEntityExtended;
};

const getAllUsers = async () => {
  const response: AxiosResponse = await axios.get('/users');
  return response.data as {
    data: Array<UserEntity>;
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

const friends = {
  fetchFollowing: (id: number) => async () => {
    const response: AxiosResponse = await axios.get(
      `/users/${id}/friends/following`
    );

    return response.data as Array<UserEntity>;
  },
  fetchFollowers: (id: number) => async () => {
    const response: AxiosResponse = await axios.get(
      `/users/${id}/friends/followers`
    );

    return response.data as Array<UserEntity>;
  },
  fetchFriends: (id: number) => async () => {
    const response: AxiosResponse = await axios.get(
      `/users/${id}/friends/mutual_friends`
    );

    return response.data as Array<UserEntity>;
  },
  addFriend: async ({
    currentUserId,
    otherPersonId,
  }: {
    currentUserId: number;
    otherPersonId: number;
  }) => {
    const data = {
      friend_id: otherPersonId,
    };

    const response: AxiosResponse = await axios.post(
      `/users/${currentUserId}/friends`,
      data
    );

    return response.data as { success: string };
  },
  removeFriend: async ({
    currentUserId,
    otherPersonId,
  }: {
    currentUserId: number;
    otherPersonId: number;
  }) => {
    const response: AxiosResponse = await axios.delete(
      `/users/${currentUserId}/friends/${otherPersonId}`
    );

    return response.data as { success: string };
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
  user: {
    getAll: getAllUsers,
    getById,
    updateById,
    friends,
  },
  messages: messages,
  chats,
  passwordRecovery,
  webSocket: {
    URL: 'ws://localhost:5401/cable',
  },
};

export default API;
