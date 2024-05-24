import { useEffect, useRef } from 'react';
import ActionCable, { Cable, Channel } from 'actioncable';
import API from '../utils/api.ts';
import ChatMessage from '../interfaces/ChatMessage.interface.ts';

const CABLE_URL = API.webSocket.URL;

interface FunctionInterface {
  (
    handleMessageReceive: (message: ChatMessage) => void,
    roomName: string,
    onChannelInitialisation: (channel: Channel) => void
  ): void;
}

const useChannelSubscription: FunctionInterface = (
  handleMessageReceive,
  roomName,
  onChannelInitialisation
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

    onChannelInitialisation(channel.current);

    return () => {
      channel.current.unsubscribe();
    };
  }, [handleMessageReceive, onChannelInitialisation, roomName]);
};

export default useChannelSubscription;
