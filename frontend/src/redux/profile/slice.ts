import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';
import { Nullable, UserProfile } from '../../interfaces';
import ProfileOperations from './operations.ts';

const initialState: {
  data: UserProfile;
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
      .addMatcher(
        isAnyOf(
          ProfileOperations.fetchProfileData.pending,
          ProfileOperations.fetchProfileDataWithoutLoading.pending
        ),
        (state, action) => ({
          ...state,
          isLoading:
            action.type ===
            ProfileOperations.fetchProfileData.pending.toString(),
          error: null,
        })
      )
      .addMatcher(
        isAnyOf(
          ProfileOperations.fetchProfileData.fulfilled,
          ProfileOperations.fetchProfileDataWithoutLoading.fulfilled
        ),
        (state, action: PayloadAction<UserProfile>) => ({
          ...state,
          data: action.payload,
          isLoading: false,
        })
      )
      .addMatcher(
        isAnyOf(
          ProfileOperations.fetchProfileData.rejected,
          ProfileOperations.fetchProfileDataWithoutLoading.rejected
        ),
        (state, action) => ({
          ...state,
          isLoading: false,
          error: action.payload as object,
        })
      );
  },
});

export const profileReducer = slice.reducer;
