import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostsFilters } from '../../interfaces';
import { resetPostsFilters } from './operations.ts';

const initialState: {
  posts: PostsFilters;
} = {
  posts: {
    content: '',
    start_date: '',
    end_date: '',
    sort_activity: '',
    sort_date: 'desc',
  },
};

const slice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setPostsFilters: (state, action: PayloadAction<PostsFilters>) => ({
      ...state,
      posts: action.payload,
    }),
  },
  extraReducers: builder => {
    builder.addCase(resetPostsFilters.fulfilled, () => ({ ...initialState }));
  },
});

export const { setPostsFilters } = slice.actions;

export const filtersReducer = slice.reducer;
