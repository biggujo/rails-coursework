import { createSlice } from '@reduxjs/toolkit';
import { ChatEntity, CommentEntity, Nullable } from '../../interfaces';
import CommentsOperations from './operations.ts';
// @ts-expect-error as it can't find the type
import { ActionsFromAsyncThunk } from '@reduxjs/toolkit/dist/matchers';

interface State {
  [key: number]: {
    items: Nullable<Array<CommentEntity>>;
    isLoading: boolean;
    error: Nullable<object>;
  };
}

const initialState: State = {
  42: {
    items: [],
    isLoading: false,
    error: null,
  },
};

const slice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(CommentsOperations.fetchByPostId.pending, (state, action) => ({
        ...state,
        [`${action.meta.arg}`]: {
          isLoading: true,
        },
      }))
      .addCase(
        CommentsOperations.fetchByPostId.fulfilled,
        (state, action: ActionsFromAsyncThunk<Array<ChatEntity>>) => ({
          ...state,
          [`${action.meta.arg}`]: {
            isLoading: false,
            items: action.payload,
          },
        })
      );
  },
});

export const commentsReducer = slice.reducer;
