import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  NewPostEntity,
  Nullable,
  PostsApi,
  PostsFilters,
} from '../../interfaces';
import API from '../../utils/api.ts';

const ERROR_MESSAGE = 'An error just happened. Please, try again later.';

const createOperations = (api: PostsApi) => ({
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

  add: createAsyncThunk(
    'posts/add',
    async (data: NewPostEntity, { rejectWithValue }) => {
      try {
        return await api.add(data);
      } catch (e) {
        return rejectWithValue(ERROR_MESSAGE);
      }
    }
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
    async (postId: number, { rejectWithValue }) => {
      try {
        return await api.deleteById(postId);
      } catch (e) {
        return rejectWithValue(ERROR_MESSAGE);
      }
    }
  ),

  likeById: createAsyncThunk(
    'posts/likeById',
    async (postId: number, { rejectWithValue }) => {
      try {
        return await api.likes.likeById(postId);
      } catch (e) {
        return rejectWithValue(ERROR_MESSAGE);
      }
    }
  ),

  dislikeById: createAsyncThunk(
    'posts/dislikeById',
    async (postId: number, { rejectWithValue }) => {
      try {
        return await api.likes.dislikeById(postId);
      } catch (e) {
        return rejectWithValue(ERROR_MESSAGE);
      }
    }
  ),
});

export type PostsOperations = ReturnType<typeof createOperations>;

export const ProfilePostsOperations: PostsOperations = createOperations(
  API.profilePosts
);

export const GroupPostsOperations: PostsOperations = createOperations(
  API.groupPosts
);
