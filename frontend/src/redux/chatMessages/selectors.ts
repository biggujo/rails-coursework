import { RootState } from '../store.ts';

export const selectChatConnection = (state: RootState) =>
  state.chatMessages.connection;

export const selectChatMessages = (state: RootState) =>
  state.chatMessages.data.items;

export const selectChatIsLoading = (state: RootState) =>
  state.chatMessages.data.isLoading;

export const selectChatError = (state: RootState) =>
  state.chatMessages.data.error;

export const selectChatPaginationMetadata = (state: RootState) =>
  state.chatMessages.metadata;

export const selectChatCurrentId = (state: RootState) =>
  state.chatMessages.currentChatId;
