import { useDispatch, useSelector } from 'react-redux';
import {
  selectChatError,
  selectChatIsLoading,
  selectChatMessages,
} from '../../redux/chatMessages/selectors.ts';
import { useEffect, useRef } from 'react';
import ChatMessagesOperations from '../../redux/chatMessages/operations.ts';
import { AppDispatch } from '../../redux/store.ts';
import useFetchAllChatsQuery from './useFetchAllChatsQuery.ts';
import findPrivateChatId from '../../utils/private-chat-id-finder.ts';
import { acceptEmptyChat } from '../../redux/chatMessages/slice.ts';
import { AsyncThunkAction, UnknownAction } from '@reduxjs/toolkit';
// @ts-expect-error of unproper package settings
import { AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk';

// Fetches messages for the given chat between user and another person
const useFetchPreviousMessagesQuery = ({
  userId,
  otherPersonId,
}: {
  userId: number;
  otherPersonId: number;
}) => {
  const { data } = useFetchAllChatsQuery();
  const dispatch: AppDispatch = useDispatch();
  const items = useSelector(selectChatMessages);
  const isLoading = useSelector(selectChatIsLoading);
  const error = useSelector(selectChatError);
  const chatId = useRef<number | null>(null);

  useEffect(() => {
    if (!data) {
      return;
    }

    chatId.current = findPrivateChatId({
      chats: data,
      givenUser1Id: userId,
      givenUser2Id: otherPersonId,
    });

    let operationToDispatch:
      | UnknownAction
      | AsyncThunkAction<unknown, unknown, AsyncThunkConfig>;

    if (chatId.current === null) {
      operationToDispatch = acceptEmptyChat();
    } else {
      operationToDispatch = ChatMessagesOperations.fetchPrevious({
        chatId: chatId.current,
      });
    }

    dispatch(operationToDispatch);
  }, [data, dispatch]);

  return { items, isLoading, error, chatId: chatId.current };
};

export default useFetchPreviousMessagesQuery;
