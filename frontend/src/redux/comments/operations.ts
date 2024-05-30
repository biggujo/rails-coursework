import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/api.ts';
import thunkErrorWrapper from '../../utils/async-thunk-error-wrapper.ts';
import { NewCommentEntity } from '../../interfaces';

const fetchByPostId = createAsyncThunk(
  'comments/fetchByPostId',
  async (postId, thunkAPI) =>
    thunkErrorWrapper(postId, API.comments.fetchByPostId, thunkAPI)
);

const add = createAsyncThunk(
  'comments/add',
  async (
    { postId, data }: { postId: number; data: NewCommentEntity },
    thunkAPI
  ) =>
    thunkErrorWrapper(
      {
        postId,
        data,
      },
      API.comments.add,
      thunkAPI
    )
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

const likeById = createAsyncThunk(
  'comments/likeById',
  async (commentId: number, thunkAPI) =>
    thunkErrorWrapper(commentId, API.comments.likes.likeById, thunkAPI)
);

const dislikeById = createAsyncThunk(
  'comments/dislikeById',
  async (commentId: number, thunkAPI) =>
    thunkErrorWrapper(commentId, API.comments.likes.dislikeById, thunkAPI)
);

const CommentsOperations = {
  fetchByPostId,
  add,
  updateById,
  deleteById,
  likeById,
  dislikeById,
};

export default CommentsOperations;
