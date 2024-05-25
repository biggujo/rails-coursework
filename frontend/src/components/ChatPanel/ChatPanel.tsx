import { Box, Typography } from '@mui/material';
import TextFormMessage from '../TextFormMessage';
import MessageList from '../MessageList';
import { User } from '../../interfaces';
import useChatPanel from '../../hooks/useChatPanel.ts';
import { useLayoutEffect, useRef } from 'react';
import Loader from '../Loader';
import FullHeightCenter from '../FullHeightCenter';
import useReachBottom from '../../hooks/useReachBottom.ts';

interface Props {
  otherPersonId: User['id'];
}

const MESSAGES_CONTAINER_ID = 'message-container';

export default function ChatPanel({ otherPersonId }: Props) {
  const { items, isLoading, error, handleSubmit } = useChatPanel(otherPersonId);
  const isAtBottom = useRef(true);

  // Track if user wants to be scrolled to bottom
  // If user at the bottom, prefer to scroll to the last messages
  // Else don't prefer to scroll
  useReachBottom({
    onBottomReached: () => (isAtBottom.current = true),
    onUnBottom: () => (isAtBottom.current = false),
    elementId: MESSAGES_CONTAINER_ID,
  });

  // Always scroll to the bottom on new messages
  useLayoutEffect(() => {
    const messageContainerRef = document.getElementById('messages-container');

    if (messageContainerRef) {
      // @ts-ignore
      messageContainerRef.addEventListener(
        'DOMNodeInserted',
        (event: HTMLDivElement) => {
          if (!isAtBottom.current) {
            console.log('Not enabled');
            return;
          }

          console.log('Enabled');

          const { currentTarget } = event;
          currentTarget.scroll({ top: currentTarget.scrollHeight });
        }
      );
    }
  }, []);

  if (error) {
    return (
      <Box>
        <Typography variant={'h2'}>
          Error: {error}. Please, try again later.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant={'h2'}>Message list:</Typography>
      <Box
        sx={{
          border: 1,
          borderColor: '#808080',
          borderRadius: '7px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column-reverse',
            height: '600px',
            py: 2,
            px: 4,
            overflowX: 'hidden',
            overflowY: 'scroll',
          }}
          id={MESSAGES_CONTAINER_ID}
        >
          {isLoading && <Loader />}
          {!isLoading && (
            <>
              {items && items.length === 0 && (
                <FullHeightCenter>
                  <Typography fontSize={'large'}>
                    Say "Hi" to start chatting
                  </Typography>
                </FullHeightCenter>
              )}
              {items && items.length > 0 && (
                <MessageList items={items} parentElId={MESSAGES_CONTAINER_ID} />
              )}
            </>
          )}
        </Box>
        <Box
          sx={{
            py: 2,
            px: 4,
            borderTop: 1,
            borderColor: '#808080',
          }}
        >
          <TextFormMessage onSubmit={handleSubmit} disabled={isLoading} />
        </Box>
      </Box>
    </Box>
  );
}
