import { Box, Typography } from '@mui/material';
import TextFormMessage from '../TextFormMessage';
import MessageList from '../MessageList';
import { User } from '../../interfaces';
import useChatPanel from '../../hooks/useChatPanel.ts';

interface Props {
  otherPersonId: User['id'];
}

export default function ChatPanel({ otherPersonId }: Props) {
  const { items, isLoading, error, handleSubmit } = useChatPanel(otherPersonId);

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
            height: '600px',
            py: 2,
            px: 4,
          }}
        >
          {isLoading && <Typography>Chat is loading...</Typography>}
          {!isLoading && (
            <>
              {items && items.length === 0 && (
                <Typography>No previous messages available</Typography>
              )}
              {items && items.length > 0 && <MessageList items={items} />}
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
