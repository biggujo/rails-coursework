import { RootState } from '../store.ts';
import { createSelector } from '@reduxjs/toolkit';

export const selectCommentsItems = (state: RootState) => state.comments;

export const selectCommentsByPostId = (id: number) =>
  createSelector(
    [selectCommentsItems],
    comments =>
      comments[id] || {
        isLoading: true,
      }
  );
