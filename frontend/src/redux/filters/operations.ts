import { createAsyncThunk } from '@reduxjs/toolkit';

export const resetPostsFilters = createAsyncThunk(
  'filters/resetPosts',
  async (_, { rejectWithValue }) => {
    try {
      return {
        a: '1',
      };
    } catch (e) {
      return rejectWithValue(ERROR_MESSAGE);
    }
  }
);
