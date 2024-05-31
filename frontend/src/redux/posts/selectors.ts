import { RootState } from '../store.ts';

export const selectPostsItems = (state: RootState) => state.posts.data.items;

export const selectPostsMetadata = (state: RootState) => state.posts.metadata;

export const selectPostsIsLoading = (state: RootState) =>
  state.posts.data.isLoading;

export const selectPostsError = (state: RootState) => state.posts.data.error;
