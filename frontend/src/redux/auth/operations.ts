import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/api.ts';
import { UserSignInFormAPI } from '../../interfaces';
import { AxiosResponse } from 'axios';
import UserSignUpFormAPI from '../../interfaces/UserSignUpFormAPI.ts';
import thunkErrorWrapper from '../../utils/async-thunk-error-wrapper.ts';

const refreshUser = createAsyncThunk('auth/refreshUser', async (_, thunkAPI) =>
  thunkErrorWrapper(null, API.auth.refreshUser, thunkAPI)
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

const signOut = createAsyncThunk('auth/SignOut', async (_, thunkAPI) =>
  thunkErrorWrapper(null, API.auth.signOut, thunkAPI)
);

const AuthOperations = {
  refreshUser,
  signIn,
  signUp,
  signOut,
};

export default AuthOperations;
