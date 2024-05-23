import { useEffect, useRef } from 'react';
import ActionCable, { Cable, Channel } from 'actioncable';
import API from '../utils/api.ts';
import ChatMessage from '../interfaces/ChatMessage.interface.ts';

const CABLE_URL = API.webSocket.URL;

interface FunctionInterface {
  (
    handleMessageReceive: (message: ChatMessage) => void,
    roomName: string
  ): Channel;
}

const useChannelSubscription: FunctionInterface = (
  handleMessageReceive,
  roomName
) => {
  const consumer = useRef<Cable>(ActionCable.createConsumer(CABLE_URL));
  const channel = useRef<Channel>(null!);

  // Initialise channel connection
  useEffect(() => {
    channel.current = consumer.current.subscriptions.create(
      {
        channel: 'SharedChannel',
        room: roomName,
      },
      {
        received: handleMessageReceive,
      }
    );

    return () => {
      channel.current.unsubscribe();
    };
  }, [handleMessageReceive, roomName]);

  return channel.current;
};

export default useChannelSubscription;
