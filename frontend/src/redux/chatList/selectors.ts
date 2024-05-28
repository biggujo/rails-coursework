import { RootState } from '../store.ts';

export const selectChatList = (state: RootState) => state.chatList.items;
