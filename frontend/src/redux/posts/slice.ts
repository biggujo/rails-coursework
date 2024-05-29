import { createSlice } from '@reduxjs/toolkit';
import { Nullable, PostEntity } from '../../interfaces';

const initialState: {
  data: Array<PostEntity>;
  isLoading: boolean;
  error: Nullable<object>;
} = {
  data: [],
  isLoading: true,
  error: null,
};

const slice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
});

export const postsReducer = slice.reducer;
