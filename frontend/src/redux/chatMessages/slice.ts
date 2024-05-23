import { createSlice } from '@reduxjs/toolkit';
import { ChatMessage } from '../../interfaces';

const initialState: {
  items: Array<ChatMessage>;
  connection: any;
} = {
  items: [],
  connection: {},
};

const slice = createSlice({
  name: 'chatHistory',
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
  },
});

export const { connectChat, addMessage } = slice.actions;

export const chatHistoryReducer = slice.reducer;
