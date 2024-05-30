import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommentEntity, Nullable } from '../../interfaces';
import CommentsOperations from './operations.ts';
// @ts-expect-error as it can't find the type
import { ActionsFromAsyncThunk } from '@reduxjs/toolkit/dist/matchers';
import { LikeResponse } from '../../utils/api.ts';

interface State {
  [key: number]: {
    items: Nullable<Array<CommentEntity>>;
    isLoading: boolean;
    error: Nullable<object>;
  };
}

const initialState: State = {
  42: {
    items: [],
    isLoading: false,
    error: null,
  },
};

const slice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(CommentsOperations.fetchByPostId.pending, (state, action) => ({
        ...state,
        [`${action.meta.arg}`]: {
          isLoading: true,
        },
      }))
      .addCase(
        CommentsOperations.likeById.fulfilled,
        (state, action: PayloadAction<LikeResponse>) => {
          const postId = action.payload.postId;
          const commentId = action.payload.id;

          const commentIndex = state[postId!].items!.findIndex(
            ({ id }) => id === commentId
          );

          if (commentIndex === -1) {
            return state;
          }

          const comment = state[postId!].items![commentIndex];

          // Toggle
          comment.liked = !comment.liked;

          // Undislike
          if (comment.disliked) {
            comment.disliked = false;
          }

          // Update number
          comment.likes_count = action.payload.likesCount;
          comment.dislikes_count = action.payload.dislikesCount;
        }
      )
      .addCase(
        CommentsOperations.dislikeById.fulfilled,
        (state, action: PayloadAction<LikeResponse>) => {
          const postId = action.payload.postId;
          const commentId = action.payload.id;

          const commentIndex = state[postId!].items!.findIndex(
            ({ id }) => id === commentId
          );

          if (commentIndex === -1) {
            return state;
          }

          const comment = state[postId!].items![commentIndex];

          // Toggle
          comment.disliked = !comment.disliked;

          // Undislike
          if (comment.liked) {
            comment.liked = false;
          }

          // Update number
          comment.likes_count = action.payload.likesCount;
          comment.dislikes_count = action.payload.dislikesCount;
        }
      )
      .addCase(
        CommentsOperations.fetchByPostId.fulfilled,
        (state, action: ActionsFromAsyncThunk<Array<CommentEntity>>) => ({
          ...state,
          [`${action.meta.arg}`]: {
            isLoading: false,
            items: action.payload,
          },
        })
      )
      .addCase(
        CommentsOperations.add.fulfilled,
        (state, action: ActionsFromAsyncThunk<Array<CommentEntity>>) => {
          const postId = action.meta.arg.postId;

          return {
            ...state,
            [`${postId}`]: {
              items: [...state[postId].items!, action.payload],
            },
          };
        }
      )
      .addCase(
        CommentsOperations.updateById.fulfilled,
        (state, action: PayloadAction<CommentEntity>) => {
          const postId = action.meta.arg.postId as number;

          if (!state[postId]) {
            return state;
          }

          const commentIndex = state[postId].items!.findIndex(
            ({ id }) => id === action.payload.id
          );

          if (commentIndex === -1) {
            return state;
          }

          state[postId].items![commentIndex] = action.payload;
        }
      )
      .addCase(CommentsOperations.deleteById.fulfilled, (state, action) => {
        const postId = action.meta.arg.postId as number;
        const commentId = action.meta.arg.commentId as number;

        if (!state[postId]) {
          return state;
        }

        const commentIndex = state[postId].items!.findIndex(
          ({ id }) => id === commentId
        );

        if (commentIndex === -1) {
          return state;
        }

        state[postId].items!.splice(commentIndex, 1);
      })
      .addCase(
        CommentsOperations.fetchByPostId.rejected,
        (state, action: ActionsFromAsyncThunk<string>) => ({
          ...state,
          [`${action.meta.arg}`]: {
            isLoading: false,
            error: action.payload,
          },
        })
      );
  },
});

export const commentsReducer = slice.reducer;
