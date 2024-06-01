import useFetchAllChatsQuery from '../hooks/query/useFetchAllChatsQuery.ts';
import { Box, Typography } from '@mui/material';
import Loader from '../components/Loader';
import createSubtitle from '../utils/create-subtitle.tsx';
import ChatList from '../components/ChatList';

export default function ChatsPage() {
  const { data, isLoading, isSuccess, isError } = useFetchAllChatsQuery();

  return (
    <>
      {createSubtitle('My chats')}
      {isLoading && (
        <Box height={400}>
          <Loader />
        </Box>
      )}
      {isError && (
        <Typography>
          An error just happened. Please, try again later.
        </Typography>
      )}
      {isSuccess && data.length === 0 && (
        <Typography>No previous chats available.</Typography>
      )}
      {isSuccess && <ChatList items={data} />}
    </>
  );
}
