import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/api.ts';

const fetchProfileDataFunction = async (id: number, { rejectWithValue }) => {
  try {
    return await API.user.getById(id);
  } catch (e) {
    return rejectWithValue(e);
  }
};

const fetchProfileData = createAsyncThunk(
  'profile/fetchProfile',
  fetchProfileDataFunction
);

const fetchProfileDataWithoutLoading = createAsyncThunk(
  'profile/fetchProfileWOLoading',
  fetchProfileDataFunction
);

const ProfileOperations = {
  fetchProfileData,
  fetchProfileDataWithoutLoading,
};

export default ProfileOperations;
