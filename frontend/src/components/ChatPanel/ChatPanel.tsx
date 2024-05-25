import { Container, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store.ts';
import { addMessage, resetChat } from '../../redux/chatMessages/slice.ts';
import useChannelSubscription from '../../hooks/useChannelSubscription.ts';
import ChatMessage from '../../interfaces/ChatMessage.interface.ts';
import TextFormMessage from '../TextFormMessage';
import { Nullable, User } from '../../interfaces';
import generateRoomName from '../../utils/chat-room-generator.ts';
import { selectAuthUser } from '../../redux/auth/selectors.ts';
import { Channel } from 'actioncable';
import { useCallback, useEffect, useRef } from 'react';
import useFetchPreviousMessagesQuery from '../../hooks/query/useFetchPreviousMessagesQuery.ts';

const handleMessageReceive =
  (dispatch: AppDispatch) => (message: ChatMessage) =>
    dispatch(addMessage(message));

interface Props {
  otherPersonId: User['id'];
}

export default function ChatPanel({ otherPersonId }: Props) {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector(selectAuthUser);
  const roomName = useRef(generateRoomName(user.id, otherPersonId));
  const { items, isLoading } = useFetchPreviousMessagesQuery({
    userId: user.id,
    otherPersonId,
  });

  let channel: Nullable<Channel> = null;

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

  const handleSubmit: (messageValue: string) => void = useCallback(
    messageValue => {
      if (!channel) {
        return;
      }

      channel.send({ body: messageValue });
    },
    [channel]
  );

  return (
    <Container>
      <Typography variant={'h2'}>Message list:</Typography>
      <TextFormMessage onSubmit={handleSubmit} />
      {isLoading && <Typography>Chat is loading</Typography>}
      {!isLoading && (
        <>
          {items && items.length === 0 && (
            <Typography>No previous messages available</Typography>
          )}
          {items && items.length > 0 && (
            <ul>
              {items.map(({ message, author_id }) => (
                <>
                  <Typography>Author: {author_id}</Typography>
                  <Typography>{message}</Typography>
                </>
              ))}
            </ul>
          )}
        </>
      )}
    </Container>
  );
}
