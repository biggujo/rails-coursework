import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Nullable, User } from '../../interfaces';
import AuthOperations from './operations.ts';

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
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(AuthOperations.fetchProfileData.pending, state => ({
        ...state,
        isLoading: true,
        error: null,
      }))
      .addCase(
        AuthOperations.fetchProfileData.fulfilled,
        (state, action: PayloadAction<User>) => ({
          ...state,
          data: action.payload,
          isLoading: false,
        })
      )
      .addCase(AuthOperations.fetchProfileData.rejected, (state, action) => ({
        ...state,
        isLoading: false,
        error: action.payload as object,
      }));
  },
});

export const authReducer = slice.reducer;
