import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';
import { ChatMessage, Nullable } from '../../interfaces';
import ChatMessagesOperations from './operations.ts';
import { FetchPreviousMessagesResponse } from '../../utils/api.ts';
import ChatOperations from '../chatList/operations.ts';

const initialState: {
  items: Array<ChatMessage>;
  isLoading: boolean;
  error: Nullable<string>;
  connection: object;
} = {
  items: [],
  isLoading: true,
  error: null,
  connection: {},
};

const slice = createSlice({
  name: 'chatMessages',
  initialState,
  reducers: {
    connectChat: (state, action) => ({
      ...state,
      connection: action.payload,
    }),
    addMessage: (state, action) => ({
      ...state,
      items: [...state.items, action.payload],
    }),
    resetChat: () => ({ ...initialState }),
    acceptEmptyChat: () => ({
      ...initialState,
      isLoading: false,
    }),
  },
  extraReducers: builder => {
    builder
      .addCase(ChatMessagesOperations.fetchPrevious.pending, state => ({
        ...state,
        isLoading: true,
      }))
      .addCase(
        ChatMessagesOperations.fetchPrevious.fulfilled,
        (
          state,
          action: PayloadAction<FetchPreviousMessagesResponse | string>
        ) => {
          return {
            ...state,
            items: (action.payload as FetchPreviousMessagesResponse).items,
            isLoading: false,
          };
        }
      )
      .addMatcher(
        isAnyOf(
          ChatOperations.fetchAll.rejected,
          ChatMessagesOperations.fetchPrevious.rejected
        ),
        (state, action) => ({
          ...state,
          isLoading: false,
          error: action.payload as string,
        })
      );
  },
});

export const { connectChat, addMessage, resetChat, acceptEmptyChat } =
  slice.actions;

export const chatHistoryReducer = slice.reducer;
