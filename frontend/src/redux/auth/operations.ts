import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/api.ts';

const fetchAuthData = createAsyncThunk(
  'auth/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      return await API.profile.getProfile();
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

const AuthOperations = {
  fetchProfileData: fetchAuthData,
};

export default AuthOperations;
