import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/api.ts';

const fetchAll = createAsyncThunk(
  'posts/fetchAll',
  async (id: number, { rejectWithValue }) => {
    try {
      return await API.posts.fetchAll(id);
    } catch (e) {
      return rejectWithValue(
        'An error just happened. Please, try again later.'
      );
    }
  }
);

const PostsOperations = {
  fetchAll,
};

export default PostsOperations;
