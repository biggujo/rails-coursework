import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  NewPostEntity,
  Nullable,
  PostsApi,
  PostsFilters,
} from '../../interfaces';
import API from '../../utils/api.ts';
import thunkErrorWrapper from '../../utils/async-thunk-error-wrapper.ts';

const ERROR_MESSAGE = 'An error just happened. Please, try again later.';

const createOperations = (api: PostsApi | Pick<PostsApi, 'fetchAll'>) => ({
  fetchAll: createAsyncThunk(
    'posts/fetchAll',
    async (
      {
        id,
        page,
        offset,
        filterData,
      }: {
        id: number;
        page: number;
        offset: number;
        filterData: Nullable<PostsFilters>;
      },
      { rejectWithValue }
    ) => {
      try {
        return await api.fetchAll({ id, page, offset, filterData });
      } catch (e) {
        return rejectWithValue(ERROR_MESSAGE);
      }
    }
  ),

  add: createAsyncThunk('posts/add', async (data: NewPostEntity, thunkAPI) =>
    thunkErrorWrapper(data, api.add, thunkAPI)
  ),

  updateById: createAsyncThunk(
    'posts/updateById',
    async (
      {
        postId,
        title,
        content,
        photos,
      }: {
        postId: number;
        title: string;
        content: string;
        photos: Array<File>;
      },
      { rejectWithValue }
    ) => {
      try {
        return await api.updateById(postId, { title, content, photos });
      } catch (e) {
        return rejectWithValue(ERROR_MESSAGE);
      }
    }
  ),

  deleteById: createAsyncThunk(
    'posts/deleteById',
    async (postId: number, thunkAPI) =>
      thunkErrorWrapper(postId, api.deleteById, thunkAPI)
  ),

  likeById: createAsyncThunk(
    'posts/likeById',
    async (postId: number, thunkAPI) =>
      thunkErrorWrapper(postId, api.likes.likeById, thunkAPI)
  ),

  dislikeById: createAsyncThunk(
    'posts/dislikeById',
    async (postId: number, thunkAPI) =>
      thunkErrorWrapper(postId, api.likes.dislikeById, thunkAPI)
  ),
});

export const resetPostsMetadata = createAsyncThunk(
  'posts/resetMetadata',
  async (_, { rejectWithValue }) => {
    try {
      return {
        a: '1',
      };
    } catch (e) {
      return rejectWithValue(ERROR_MESSAGE);
    }
  }
);

export type PostsOperations = ReturnType<typeof createOperations>;

export const AllPostsOperations: Pick<PostsOperations, 'fetchAll'> =
  createOperations(API.allPosts);

export const ProfilePostsOperations: PostsOperations = createOperations(
  API.profilePosts
);

export const GroupPostsOperations: PostsOperations = createOperations(
  API.groupPosts
);
