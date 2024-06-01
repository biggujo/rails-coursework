import {
  AsyncThunk,
  AsyncThunkConfig,
} from '@reduxjs/toolkit/dist/createAsyncThunk';
import { PostEntity } from './index.ts';
import { LikeResponse } from '../utils/api.ts';

interface PostsApi {
  fetchAll: AsyncThunk<never, Array<PostEntity>, AsyncThunkConfig>;
  add: AsyncThunk<never, PostEntity, AsyncThunkConfig>;
  updateById: AsyncThunk<never, PostEntity, AsyncThunkConfig>;
  deleteById: AsyncThunk<never, void, AsyncThunkConfig>;
  likes: {
    likeById: AsyncThunk<never, LikeResponse, AsyncThunkConfig>;
    dislikeById: AsyncThunk<never, LikeResponse, AsyncThunkConfig>;
  };
}

export default PostsApi;
