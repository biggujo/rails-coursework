import { RootState } from '../store.ts';

export const selectMessageHistory = (state: RootState) =>
  state.chatMessages.items;

export const selectChatConnection = (state: RootState) =>
  state.chatMessages.connection;
