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
    data: UserSignInFormAPI | UserSignUpFormAPI
  ) => Promise<AxiosResponse>
) =>
  createAsyncThunk(
    'auth/signIn',
    async (data: UserSignInFormAPI, { rejectWithValue }) => {
      try {
        console.log(data);

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

const signIn = signingOperation(API.auth.signIn as any);

const signUp = signingOperation(API.auth.signUp as any);

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
