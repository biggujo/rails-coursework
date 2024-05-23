import { useRef } from 'react';
import ActionCable, { Cable, Channel } from 'actioncable';
import API from '../utils/api.ts';
import ChatMessage from '../interfaces/ChatMessage.interface.ts';

const CABLE_URL = API.webSocket.URL;

interface FunctionInterface {
  (handleMessageReceive: (message: ChatMessage) => void): Channel;
}

const useChannelSubscription: FunctionInterface = handleMessageReceive => {
  const consumer = useRef<Cable>(ActionCable.createConsumer(CABLE_URL));
  const channel = useRef<Channel>(
    consumer.current.subscriptions.create(
      {
        channel: 'SharedChannel',
      },
      {
        received: handleMessageReceive,
      }
    )
  );

  return channel.current;
};

export default useChannelSubscription;
