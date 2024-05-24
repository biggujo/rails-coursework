import { RootState } from '../store.ts';

export const selectAuth = (state: RootState) => state.auth;

export const selectAuthUser = (state: RootState) => state.auth.info.data;

export const selectAuthIsLoggedIn = (state: RootState) =>
  state.auth.status.isLoggedIn;

export const selectAuthToken = (state: RootState) => state.auth.status.token;
