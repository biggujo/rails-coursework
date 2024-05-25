import { RootState } from '../store.ts';

export const selectChatConnection = (state: RootState) =>
  state.chatMessages.connection;

export const selectChatMessages = (state: RootState) =>
  state.chatMessages.items;

export const selectChatIsLoading = (state: RootState) =>
  state.chatMessages.isLoading;

export const selectChatError = (state: RootState) => state.chatMessages.error;
