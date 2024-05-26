import { ChatEntity } from '../../interfaces';
import { createSlice } from '@reduxjs/toolkit';

const initialState: {
  items: Array<ChatEntity>;
} = {
  items: [],
};

const slice = createSlice({
  name: 'chatList',
  initialState,
  reducers: {},
});

export const chatListReducer = slice.reducer;
