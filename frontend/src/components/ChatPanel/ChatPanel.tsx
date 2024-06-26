import { Box, Typography } from '@mui/material';
import TextFormMessage from '../TextFormMessage';
import MessageList from '../MessageList';
import { UserProfile } from '../../interfaces';
import useChatPanel from '../../hooks/useChatPanel.ts';
import { useLayoutEffect, useReducer, useRef } from 'react';
import Loader from '../Loader';
import FullHeightCenter from '../FullHeightCenter';
import PrivateChatTitleBar from '../PrivateChatTitleBar/PrivateChatTitleBar.tsx';
import { useSelector } from 'react-redux';
import { selectAuthUser } from '../../redux/auth/selectors.ts';
import { Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useReachBottom from '../../hooks/useReachBottom.ts';

interface Props {
  otherPersonId: UserProfile['id'];
}

const MESSAGES_CONTAINER_ID = 'message-container';

export default function ChatPanel({ otherPersonId }: Props) {
  const { items, isLoading, error, chatId, handleSubmit } =
    useChatPanel(otherPersonId);
  const isAtBottom = useRef(true);
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const messageContainerRef = useRef<HTMLElement>(null);
  const user = useSelector(selectAuthUser);
  const { t } = useTranslation();

  // Track if user wants to be scrolled to bottom
  // If user at the bottom, prefer to scroll to the last messages
  // Else don't prefer to scroll
  useReachBottom({
    onBottomReached: () => {
      isAtBottom.current = true;
      forceUpdate();
    },
    onUnBottom: () => {
      isAtBottom.current = false;
      forceUpdate();
    },
    elementId: MESSAGES_CONTAINER_ID,
  });

  // Always scroll to the bottom on new messages
  useLayoutEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.addEventListener(
        'DOMNodeInserted',
        (event: Event) => {
          if (!isAtBottom.current) {
            return;
          }

          const currentTarget = event.currentTarget as HTMLDivElement;
          currentTarget.scroll({ top: currentTarget.scrollHeight });
        }
      );
    }
  }, []);

  // Prohibit messaging to yourself
  if (user.id === otherPersonId) {
    return <Navigate to={'/'} />;
  }

  if (error) {
    return (
      <Box>
        <Typography variant={'h6'}>{t('error.tryAgainLater')}</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box
        sx={{
          position: 'relative',
          border: 1,
          borderColor: '#808080',
          borderRadius: '7px',
        }}
      >
        <Box
          sx={{
            py: 2,
            px: 4,
            borderBottom: 1,
            borderColor: '#808080',
          }}
        >
          <PrivateChatTitleBar chatId={chatId} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column-reverse',
            height: '500px',
            py: 2,
            px: 4,
            overflowX: 'hidden',
            overflowY: 'scroll',
          }}
          id={MESSAGES_CONTAINER_ID}
          ref={messageContainerRef}
        >
          {isLoading && <Loader />}
          {!isLoading && (
            <>
              {items && items.length === 0 && (
                <FullHeightCenter>
                  <Typography fontSize={'large'}>
                    {t('chat.sayHiToStart')}
                  </Typography>
                </FullHeightCenter>
              )}
              {items && items.length > 0 && (
                <Box>
                  <MessageList
                    items={items}
                    parentElId={MESSAGES_CONTAINER_ID}
                  />

                  {!isAtBottom.current && (
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: '80px',
                        left: -1,
                        width: 'calc(100% + 2px)',
                      }}
                    ></Box>
                  )}
                </Box>
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
