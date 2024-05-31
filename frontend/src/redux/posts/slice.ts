import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';
import { Nullable, PostEntity } from '../../interfaces';
import { ProfilePostsOperations } from './operations.ts';
import { FetchAllPostsResponse, LikeResponse } from '../../utils/api.ts';

const initialState: {
  data: {
    items: Array<PostEntity>;
    isLoading: boolean;
    error: Nullable<string>;
  };
} = {
  data: {
    items: [],
    isLoading: true,
    error: null,
  },
};

const slice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(ProfilePostsOperations.fetchAll.pending, state => ({
        ...state,
        data: {
          ...state.data,
          isLoading: true,
          error: null,
        },
      }))
      .addCase(
        ProfilePostsOperations.likeById.fulfilled,
        (state, action: PayloadAction<LikeResponse>) => {
          const postIndex = state.data.items.findIndex(
            ({ id: postId }) => postId === action.payload.id
          );

          if (postIndex === -1) {
            return state;
          }

          const post = state.data.items[postIndex];

          // Toggle
          post.liked = !post.liked;

          // Undislike
          if (post.disliked) {
            post.disliked = false;
          }

          // Update number
          post.likes_count = action.payload.likesCount;
          post.dislikes_count = action.payload.dislikesCount;
        }
      )
      .addCase(
        ProfilePostsOperations.dislikeById.fulfilled,
        (state, action: PayloadAction<LikeResponse>) => {
          const postIndex = state.data.items.findIndex(
            ({ id: postId }) => postId === action.payload.id
          );

          if (postIndex === -1) {
            return state;
          }

          const post = state.data.items[postIndex];

          // Toggle
          post.disliked = !post.disliked;

          // Undislike
          if (post.liked) {
            post.liked = false;
          }

          // Update number
          post.likes_count = action.payload.likesCount;
          post.dislikes_count = action.payload.dislikesCount;
        }
      )
      .addCase(
        ProfilePostsOperations.fetchAll.fulfilled,
        (state, action: PayloadAction<FetchAllPostsResponse>) => ({
          ...state,
          data: {
            ...state.data,
            items: action.payload.items,
            isLoading: false,
          },
        })
      )
      .addCase(
        ProfilePostsOperations.add.fulfilled,
        (state, action: PayloadAction<PostEntity>) => ({
          ...state,
          data: {
            ...state.data,
            items: [action.payload, ...state.data.items],
            isLoading: false,
          },
        })
      )
      .addCase(
        ProfilePostsOperations.updateById.fulfilled,
        (state, action: PayloadAction<PostEntity>) => {
          const postIndex = state.data.items.findIndex(
            ({ id: postId }) => postId === action.payload.id
          );

          if (postIndex === -1) {
            return state;
          }

          const updatedPosts = [...state.data.items];

          updatedPosts[postIndex] = action.payload;

          return {
            ...state,
            data: {
              ...state.data,
              items: updatedPosts,
              isLoading: false,
            },
          };
        }
      )
      .addCase(
        ProfilePostsOperations.deleteById.fulfilled,
        (state, action: PayloadAction<PostEntity>) => {
          const postIndex = state.data.items.findIndex(
            ({ id: postId }) => postId === action.payload.id
          );

          if (postIndex === -1) {
            return state;
          }

          const updatedPosts = [...state.data.items];

          updatedPosts.splice(postIndex, 1);

          return {
            ...state,
            data: {
              ...state.data,
              items: updatedPosts,
              isLoading: false,
            },
          };
        }
      )
      .addMatcher(
        isAnyOf(
          ProfilePostsOperations.fetchAll.rejected,
          ProfilePostsOperations.updateById.rejected,
          ProfilePostsOperations.deleteById.rejected
        ),
        (state, action: PayloadAction<string>) => ({
          ...state,
          data: {
            ...state.data,
            error: action.payload,
          },
        })
      );
  },
});

export const postsReducer = slice.reducer;
