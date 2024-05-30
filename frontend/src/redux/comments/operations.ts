import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/api.ts';
import thunkErrorWrapper from '../../utils/async-thunk-error-wrapper.ts';

const fetchByPostId = createAsyncThunk(
  'comments/fetchByPostId',
  async (postId, thunkAPI) =>
    thunkErrorWrapper(postId, API.comments.fetchByPostId, thunkAPI)
);

const CommentsOperations = {
  fetchByPostId,
};

export default CommentsOperations;
