import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';
import { Nullable, PostEntity } from '../../interfaces';
import PostsOperations from './operations.ts';
import { FetchAllPostsResponse } from '../../utils/api.ts';

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
      .addCase(PostsOperations.fetchAll.pending, state => ({
        ...state,
        data: {
          ...state.data,
          isLoading: true,
          error: null,
        },
      }))
      .addCase(
        PostsOperations.fetchAll.fulfilled,
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
        PostsOperations.deleteById.fulfilled,
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
              ...state,
              items: updatedPosts,
            },
          };
        }
      )
      .addMatcher(
        isAnyOf(
          PostsOperations.fetchAll.rejected,
          PostsOperations.deleteById.rejected
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
