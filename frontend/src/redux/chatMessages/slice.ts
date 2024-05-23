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
  name: 'chatMessages',
  initialState,
  reducers: {
    connectChat: (state, action) => {
      return {
        ...state,
        connection: action.payload,
      };
    },
    addMessage: (state, action) => ({
      ...state,
    }),
  },
});

export const { connectChat, addMessage } = slice.actions;

export const chatMessagesReducer = slice.reducer;
