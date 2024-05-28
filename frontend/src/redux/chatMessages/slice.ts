import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';
import { ChatMessage, Nullable } from '../../interfaces';
import ChatMessagesOperations from './operations.ts';
import { FetchPreviousMessagesResponse } from '../../utils/api.ts';
import ChatOperations from '../chatList/operations.ts';

const initialState: {
  data: {
    items: Array<ChatMessage>;
    isLoading: boolean;
    error: Nullable<string>;
  };
  metadata: {
    isInitialised: boolean;
    offset: number;
    page: number;
    maxPage: number;
  };
  currentChatId: number;
  connection: object;
} = {
  data: {
    items: [],
    isLoading: true,
    error: null,
  },
  metadata: {
    isInitialised: false,
    offset: 0,
    page: 0,
    maxPage: 0,
  },
  currentChatId: null!,
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
      data: {
        ...state.data,
        items: [...state.data.items, action.payload],
      },
      metadata: {
        ...state.metadata,
        offset: state.metadata.offset + 1,
      },
    }),
    resetChat: () => ({ ...initialState }),
    acceptEmptyChat: state => ({
      ...initialState,
      data: {
        ...initialState.data,
        isLoading: false,
      },
      currentChatId: state.currentChatId,
    }),
  },
  extraReducers: builder => {
    builder
      .addMatcher(
        isAnyOf(
          ChatMessagesOperations.fetchPrevious.pending,
          ChatMessagesOperations.fetchPreviousWithoutLoading.pending
        ),
        (state, action) => ({
          ...state,
          data: {
            ...state.data,
            isLoading:
              action.type ===
              ChatMessagesOperations.fetchPrevious.pending.toString(),
          },
          metadata: {
            ...state.metadata,
            isInitialised: true,
          },
        })
      )
      .addMatcher(
        isAnyOf(
          ChatMessagesOperations.fetchPrevious.fulfilled,
          ChatMessagesOperations.fetchPreviousWithoutLoading.fulfilled
        ),
        (
          state,
          action: PayloadAction<FetchPreviousMessagesResponse | string>
        ) => {
          return {
            ...state,
            data: {
              ...state.data,
              items: [
                ...(action.payload as FetchPreviousMessagesResponse).items,
                ...state.data.items,
              ],
              isLoading: false,
            },
            metadata: {
              ...state.metadata,
              offset: state.metadata.offset > 0 ? state.metadata.offset - 1 : 0,
              page: state.metadata.page ? state.metadata.page + 1 : 2,
              maxPage: (action.payload as FetchPreviousMessagesResponse)
                .metadata.last,
            },
            currentChatId: (action.payload as FetchPreviousMessagesResponse)
              .private_chat_id,
          };
        }
      )
      .addMatcher(
        isAnyOf(
          ChatOperations.fetchAll.rejected,
          ChatMessagesOperations.fetchPrevious.rejected,
          ChatMessagesOperations.fetchPreviousWithoutLoading.rejected
        ),
        (state, action) => ({
          ...state,
          data: {
            ...state.data,
            isLoading: false,
            error: action.payload as string,
          },
        })
      );
  },
});

export const { connectChat, addMessage, resetChat, acceptEmptyChat } =
  slice.actions;

export const chatHistoryReducer = slice.reducer;
