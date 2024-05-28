import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/api.ts';

const fetchProfileData = createAsyncThunk(
  'profile/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      return await API.profile.getProfile();
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

const ProfileOperations = {
  fetchProfileData,
};

export default ProfileOperations;
