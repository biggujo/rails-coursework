import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostsFilters } from '../../interfaces';

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
    clearPostsFilters: () => ({ ...initialState }),
  },
});

export const { setPostsFilters, clearPostsFilters } = slice.actions;

export const filtersReducer = slice.reducer;
