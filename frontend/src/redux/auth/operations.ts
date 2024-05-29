import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/api.ts';
import { UserSignInFormAPI } from '../../interfaces';
import { AxiosResponse } from 'axios';
import UserSignUpFormAPI from '../../interfaces/UserSignUpFormAPI.ts';

const refreshUser = createAsyncThunk(
  'auth/refreshUser',
  async (_, { rejectWithValue }) => {
    try {
      return await API.auth.refreshUser();
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

const signingOperation = (
  apiOperation: (
    data: UserSignInFormAPI & UserSignUpFormAPI
  ) => Promise<AxiosResponse>
) =>
  createAsyncThunk(
    'auth/signing',
    async (
      data: UserSignInFormAPI & UserSignUpFormAPI,
      { rejectWithValue }
    ) => {
      try {
        const response: AxiosResponse = await apiOperation(data);

        const token = response.headers.authorization;

        return {
          ...response.data,
          token,
        };
      } catch (e) {
        return rejectWithValue(e);
      }
    }
  );

const signIn = signingOperation(API.auth.signIn);

const signUp = signingOperation(API.auth.signUp);

const signOut = createAsyncThunk(
  'auth/SignOut',
  async (_, { rejectWithValue }) => {
    try {
      await API.auth.signOut();
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

const AuthOperations = {
  refreshUser,
  signIn,
  signUp,
  signOut,
};

export default AuthOperations;
