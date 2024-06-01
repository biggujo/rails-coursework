import { RootState } from '../store.ts';
import { createSelector } from '@reduxjs/toolkit';

const selectCommentsItems = (state: RootState) => state.comments;

export const selectCommentsByPostId = (id: number) =>
  createSelector(
    [selectCommentsItems],
    comments =>
      comments[id] || {
        isLoading: true,
      }
  );

export const selectCommentById = ({
  postId,
  commentId,
}: {
  postId: number;
  commentId: number;
}) =>
  createSelector([selectCommentsByPostId(postId)], comments => {
    const comment = comments.items!.find(({ id }) => id === commentId);

    if (typeof comment === 'undefined') {
      return null;
    }

    return comment;
  });
