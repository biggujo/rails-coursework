import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/api.ts';

const fetchProfileData = createAsyncThunk(
  'profile/fetchData',
  async (id: number, { rejectWithValue }) => {
    try {
      return await API.user.getById(id);
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

const ProfileOperations = {
  fetchProfileData,
};

export default ProfileOperations;
