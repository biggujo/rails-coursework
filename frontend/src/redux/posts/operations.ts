import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/api.ts';

const ERROR_MESSAGE = 'An error just happened. Please, try again later.';

const fetchAll = createAsyncThunk(
  'posts/fetchAll',
  async (userId: number, { rejectWithValue }) => {
    try {
      return await API.posts.fetchAll(userId);
    } catch (e) {
      return rejectWithValue(ERROR_MESSAGE);
    }
  }
);

const deleteById = createAsyncThunk(
  'posts/deleteById',
  async (postId: number, { rejectWithValue }) => {
    try {
      return await API.posts.deleteById(postId);
    } catch (e) {
      return rejectWithValue(ERROR_MESSAGE);
    }
  }
);

const PostsOperations = {
  fetchAll,
  deleteById,
};

export default PostsOperations;
