import { RootState } from '../store.ts';

export const selectChatMessages = (state: RootState) =>
  state.chatMessages.items;

export const selectChatConnection = (state: RootState) =>
  state.chatMessages.connection;
