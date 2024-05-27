import { RootState } from '../store';

export const selectProfile = (state: RootState) => state.profile;

export const selectProfileData = (state: RootState) => state.profile.data;
