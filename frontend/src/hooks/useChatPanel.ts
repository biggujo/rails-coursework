import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Channel } from 'actioncable';
import { ChatMessage, Nullable } from '../interfaces';
import { AppDispatch } from '../redux/store.ts';
import { selectAuthUser } from '../redux/auth/selectors.ts';
import generateRoomName from '../utils/chat-room-generator.ts';
import useFetchPreviousMessagesQuery from './query/useFetchPreviousMessagesQuery.ts';
import useChannelSubscription from './useChannelSubscription.ts';
import { addMessage, resetChat } from '../redux/chatMessages/slice.ts';

const handleMessageReceive =
  (dispatch: AppDispatch) => (message: ChatMessage) =>
    dispatch(addMessage(message));

const useChatPanel = (otherPersonId: number) => {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector(selectAuthUser);
  const roomName = useRef(generateRoomName(user.id, otherPersonId));
  const { items, isLoading, error, chatId } = useFetchPreviousMessagesQuery({
    userId: user.id,
    otherPersonId,
  });

  let channel: Nullable<Channel> = null;

  const handleSubmit: (messageValue: string) => void = useCallback(
    messageValue => {
      if (!channel) {
        return;
      }

      channel.send({ body: messageValue });
    },
    [channel]
  );

  useChannelSubscription(
    handleMessageReceive(dispatch),
    roomName.current,
    ch => (channel = ch)
  );

  // Clear on page change
  useEffect(() => {
    return () => {
      dispatch(resetChat());
    };
  }, [dispatch]);

  return { items, isLoading, error, handleSubmit, chatId };
};

export default useChatPanel;
