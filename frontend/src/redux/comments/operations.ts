import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/api.ts';
import thunkErrorWrapper from '../../utils/async-thunk-error-wrapper.ts';

const fetchByPostId = createAsyncThunk(
  'comments/fetchByPostId',
  async (postId, thunkAPI) =>
    thunkErrorWrapper(postId, API.comments.fetchByPostId, thunkAPI)
);

const updateById = createAsyncThunk(
  'comments/updateById',
  async (
    {
      postId,
      commentId,
      data,
    }: {
      postId: number;
      commentId: number;
      data: {
        text: string;
      };
    },
    thunkAPI
  ) =>
    thunkErrorWrapper(
      { postId, commentId, data },
      API.comments.updateById,
      thunkAPI
    )
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
  updateById,
  deleteById,
};

export default CommentsOperations;
