import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Nullable, User } from '../../interfaces';
import ProfileOperations from './operations.ts';

const initialState: {
  data: User;
  isLoading: boolean;
  error: Nullable<object>;
} = {
  data: null!,
  isLoading: true,
  error: null,
};

const slice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(ProfileOperations.fetchProfileData.pending, state => ({
        ...state,
        isLoading: true,
        error: null,
      }))
      .addCase(
        ProfileOperations.fetchProfileData.fulfilled,
        (state, action: PayloadAction<User>) => ({
          ...state,
          data: action.payload,
          isLoading: false,
        })
      )
      .addCase(
        ProfileOperations.fetchProfileData.rejected,
        (state, action) => ({
          ...state,
          isLoading: false,
          error: action.payload as object,
        })
      );
  },
});

export const profileReducer = slice.reducer;
