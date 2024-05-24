import { Container, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectMessageHistory } from '../../redux/chatMessages/selectors.ts';
import { AppDispatch } from '../../redux/store.ts';
import { addMessage } from '../../redux/chatMessages/slice.ts';
import useChannelSubscription from '../../hooks/useChannelSubscription.ts';
import ChatMessage from '../../interfaces/ChatMessage.interface.ts';
import TextFormMessage from '../TextFormMessage';
import { User } from '../../interfaces';
import generateRoomName from '../../utils/chat-room-generator.ts';
import { selectAuthUser } from '../../redux/auth/selectors.ts';

const handleMessageReceive =
  (dispatch: AppDispatch) => (message: ChatMessage) =>
    dispatch(addMessage(message));

interface Props {
  otherPersonId: User['id'];
}

export default function ChatPanel({ otherPersonId }: Props) {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector(selectAuthUser);

  const messageHistory = useSelector(selectMessageHistory);
  const channel = useChannelSubscription(
    handleMessageReceive(dispatch),
    generateRoomName(Number(user.id), Number(otherPersonId))
  );

  const handleSubmit: (messageValue: string) => void = messageValue => {
    channel.send({ body: messageValue });
  };

  return (
    <Container>
      <Typography variant={'h2'}>Message list:</Typography>
      <TextFormMessage onSubmit={handleSubmit} />
      <ul>
        {messageHistory.map(({ body, author_id }) => (
          <>
            <Typography>Author: {author_id}</Typography>
            <Typography>{body}</Typography>
          </>
        ))}
      </ul>
    </Container>
  );
}
