import useFetchAllChatsQuery from '../hooks/query/useFetchAllChatsQuery.ts';
import { Box, Typography } from '@mui/material';
import Loader from '../components/Loader';
import createSubtitle from '../utils/create-subtitle.tsx';
import ChatList from '../components/ChatList';
import { useTranslation } from 'react-i18next';

export default function ChatsPage() {
  const { data, isLoading, isSuccess, isError } = useFetchAllChatsQuery();
  const { t } = useTranslation();

  return (
    <>
      {createSubtitle(t('chat.myChats'))}
      {isLoading && (
        <Box height={400}>
          <Loader />
        </Box>
      )}
      {isError && <Typography>{t('error.tryAgainLater')}</Typography>}
      {isSuccess && data.length === 0 && (
        <Typography>{t('chat.noChatsAvailable')}</Typography>
      )}
      {isSuccess && <ChatList items={data} />}
    </>
  );
}
