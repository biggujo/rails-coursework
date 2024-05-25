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
      .addCase(ChatMessagesOperations.fetchPrevious.pending, state => ({
        ...state,
        data: {
          ...state.data,
          isLoading: true,
        },
        metadata: {
          ...state.metadata,
          isInitialised: true,
        },
      }))
      .addCase(
        ChatMessagesOperations.fetchPrevious.fulfilled,
        (
          state,
          action: PayloadAction<FetchPreviousMessagesResponse | string>
        ) => ({
          ...state,
          data: {
            ...state.data,
            items: [
              ...state.data.items,
              ...(action.payload as FetchPreviousMessagesResponse).items,
            ],
            isLoading: false,
          },
          metadata: {
            ...state.metadata,
            page: state.metadata.page + 1,
            maxPage: (action.payload as FetchPreviousMessagesResponse).metadata
              .last,
          },
          currentChatId: (action.payload as FetchPreviousMessagesResponse)
            .private_chat_id,
        })
      )
      .addMatcher(
        isAnyOf(
          ChatOperations.fetchAll.rejected,
          ChatMessagesOperations.fetchPrevious.rejected
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
