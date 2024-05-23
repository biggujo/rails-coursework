import API from '../utils/api.ts';
import {
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react';
import ActionCable, { Cable, Channel, Subscriptions } from 'actioncable';
import { Button, Container, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectMessageHistory } from '../redux/chatMessages/selectors.ts';
import { AppDispatch } from '../redux/store.ts';
import { addMessage } from '../redux/chatMessages/slice.ts';

export default function SharedChatPage() {
  const consumer = useRef<Cable>(ActionCable.createConsumer(API.webSocket.URL));
  const [channel, setChannel] = useState<Channel>(null!);
  const [messageValue, setMessageValue] = useState('');
  const messageHistory = useSelector(selectMessageHistory);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    setChannel(
      consumer.current.subscriptions.create(
        {
          channel: 'SharedChannel',
        },
        {
          received: message => {
            dispatch(addMessage(message));
          },
        }
      )
    );
  }, []);

  const handleMessageValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setMessageValue(value);
  };

  const handleSendMessageClick = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    channel.send({ body: messageValue });
    setMessageValue('');
  };

  return (
    <Container>
      <form onSubmit={handleSendMessageClick}>
        <TextField
          label={'Message'}
          onChange={handleMessageValueChange}
          required
          value={messageValue}
        />
        <Button variant={'contained'} type={'submit'}>
          Send message
        </Button>
      </form>
      <Typography variant={'h2'}>Message list:</Typography>
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
