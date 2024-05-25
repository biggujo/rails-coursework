import { Box, Typography } from '@mui/material';
import TextFormMessage from '../TextFormMessage';
import MessageList from '../MessageList';
import { User } from '../../interfaces';
import useChatPanel from '../../hooks/useChatPanel.ts';
import { useEffect, useLayoutEffect, useRef } from 'react';
import Loader from '../Loader';
import throttle from 'lodash.throttle';

interface Props {
  otherPersonId: User['id'];
}

const MESSAGES_CONTAINER_ID = 'message-container';

export default function ChatPanel({ otherPersonId }: Props) {
  const { items, isLoading, error, handleSubmit } = useChatPanel(otherPersonId);
  const isAtBottom = useRef(true);

  useEffect(() => {
    let lastScrollTop = 0;
    const el = document.getElementById(MESSAGES_CONTAINER_ID);

    el.addEventListener(
      'scroll',
      throttle(() => {
        // Return on upscroll
        if (el.scrollTop < lastScrollTop) {
          isAtBottom.current = false;
          return;
        }

        lastScrollTop = el.scrollTop <= 0 ? 0 : el.scrollTop;

        if (el.scrollTop + el.offsetHeight < el.scrollHeight) {
          isAtBottom.current = true;
        }
      }, 200)
    );
  }, []);

  useEffect(() => {
    console.log(isAtBottom.current);
  }, [isAtBottom.current]);

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
                <Typography>No previous messages available</Typography>
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
          <TextFormMessage onSubmit={handleSubmit} />
        </Box>
      </Box>
    </Box>
  );
}
