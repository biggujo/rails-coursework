import { Nullable, User } from '../../interfaces';
import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import AuthOperations from './operations.ts';

const initialState: {
  info: {
    data: User;
    isLoading: boolean;
    error: Nullable<string>;
  };
  status: {
    token: Nullable<string>;
    isLoggedIn: boolean;
    isRefreshing: boolean;
  };
} = {
  info: {
    data: null!,
    isLoading: false,
    error: null,
  },
  status: {
    token: null!,
    isLoggedIn: false,
    isRefreshing: false,
  },
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthData: () => ({
      ...initialState,
    }),
  },
  extraReducers: builder => {
    builder
      .addCase(AuthOperations.refreshUser.fulfilled, (state, action) => ({
        ...state,
        info: {
          ...state.info,
          data: action.payload,
        },
        status: {
          ...state.status,
          isRefreshing: false,
          isLoggedIn: true,
        },
      }))
      .addCase(AuthOperations.refreshUser.rejected, state => ({
        ...state,
        status: {
          ...state.status,
          isRefreshing: false,
          isLoggedIn: false,
        },
      }))
      .addCase(AuthOperations.signOut.pending, () => ({
        ...initialState,
      }))
      .addMatcher(
        isAnyOf(AuthOperations.signIn.pending, AuthOperations.signUp.pending),
        state => ({
          ...state,
          info: {
            ...state.info,
            isLoading: true,
            error: null,
          },
        })
      )
      .addMatcher(
        isAnyOf(
          AuthOperations.signIn.fulfilled,
          AuthOperations.signUp.fulfilled
        ),
        (state, action) => ({
          ...state,
          info: {
            ...state.info,
            data: action.payload.data,
          },
          status: {
            ...state.status,
            isLoggedIn: true,
            isLoading: false,
            token: action.payload.token,
          },
        })
      )
      .addMatcher(
        isAnyOf(AuthOperations.signIn.rejected, AuthOperations.signUp.rejected),
        state => ({
          ...state,
          status: {
            ...state.status,
            isLoading: false,
            isLoggedIn: false,
            token: null,
          },
        })
      );
  },
});

export const { resetAuthData } = slice.actions;

export const authReducer = slice.reducer;
