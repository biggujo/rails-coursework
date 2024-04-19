import { Button, Container, TextField, Typography } from '@mui/material';
import useWebSocket from 'react-use-websocket';
import API from '../utils/api.ts';
import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';

export default function SharedChatPage() {
  const [value, setValue] = useState('abc');
  const [messageHistory, setMessageHistory] = useState<MessageEvent<any>[]>([]);
  const { sendMessage, lastMessage, readyState } = useWebSocket(
    API.webSocket.URL
  );

  console.log(messageHistory);

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory(prevState => [lastMessage, ...prevState]);
    }
  }, [lastMessage]);

  const handleMessageValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };

  const handleSendMessageClick = () => {
    sendMessage(value);
    setValue('');
  };

  return (
    <Container>
      <TextField
        label={'Message'}
        onChange={handleMessageValueChange}
        required
        value={value}
      />
      <Button variant={'contained'} onClick={handleSendMessageClick}>
        Send message
      </Button>
      <Typography variant={'h2'}>Message list:</Typography>
      <ul>
        {messageHistory.map(({ data }) => (
          <Typography>{data}</Typography>
        ))}
      </ul>
    </Container>
  );
}
