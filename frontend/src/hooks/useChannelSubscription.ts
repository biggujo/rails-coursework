import { useEffect, useRef } from 'react';
import ActionCable, { Cable, Channel } from 'actioncable';
import API from '../utils/api.ts';
import ChatMessage from '../interfaces/ChatMessage.interface.ts';

const CABLE_URL = API.webSocket.URL;

const CHANNEL = 'PrivateChannel';

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
    if (channel.current) {
      return;
    }

    channel.current = consumer.current.subscriptions.create(
      {
        channel: CHANNEL,
        room: roomName,
      },
      {
        received: handleMessageReceive,
      }
    );

    onChannelInitialisation(channel.current);
    // eslint-disable-next-line
  }, []);
};

export default useChannelSubscription;
