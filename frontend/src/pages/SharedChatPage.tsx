import API from '../utils/api.ts';
import { useEffect, useRef, useState } from 'react';
import ActionCable, { Cable, Channel, Subscriptions } from 'actioncable';

export default function SharedChatPage() {
  const consumer = useRef<Cable>(ActionCable.createConsumer(API.webSocket.URL));
  const [channel, setChannel] = useState<Channel>(null!);

  useEffect(() => {
    setChannel(
      consumer.current.subscriptions.create({
        channel: 'SharedChannel',
      })
    );
  }, []);

  useEffect(() => {
    setInterval(() => {
      channel.send({ title: 'Hello' });
    }, 2000);
  }, [channel]);

  return <div></div>;

  // return (
  //   <Container>
  //     <TextField
  //       label={'Message'}
  //       onChange={handleMessageValueChange}
  //       required
  //       value={value}
  //     />
  //     <Button variant={'contained'} onClick={handleSendMessageClick}>
  //       Send message
  //     </Button>
  //     <Typography variant={'h2'}>Message list:</Typography>
  //     <ul>
  //       {messageHistory.map(({ data }) => (
  //         <Typography>{data}</Typography>
  //       ))}
  //     </ul>
  //   </Container>
  // );
}
