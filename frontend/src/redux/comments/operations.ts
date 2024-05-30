import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/api.ts';
import thunkErrorWrapper from '../../utils/async-thunk-error-wrapper.ts';

const fetchByPostId = createAsyncThunk(
  'comments/fetchByPostId',
  async (postId, thunkAPI) =>
    thunkErrorWrapper(postId, API.comments.fetchByPostId, thunkAPI)
);

const deleteById = createAsyncThunk(
  'comments/deleteById',
  async (
    {
      postId,
      commentId,
    }: {
      postId: number;
      commentId: number;
    },
    thunkAPI
  ) =>
    thunkErrorWrapper({ postId, commentId }, API.comments.deleteById, thunkAPI)
);

const CommentsOperations = {
  fetchByPostId,
  deleteById,
};

export default CommentsOperations;
