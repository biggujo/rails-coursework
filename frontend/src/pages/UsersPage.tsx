import { Box, Typography } from '@mui/material';
import UserProfileList from '../components/UserProfileList/UserProfileList.tsx';
import useGetAllUsersQuery from '../hooks/query/useGetAllUsers.ts';
import Loader from '../components/Loader';
import { useTranslation } from 'react-i18next';

export default function UsersPage() {
  const { data, isLoading, isSuccess, isError } = useGetAllUsersQuery();
  const { t } = useTranslation();

  return (
    <>
      <Typography variant={'h2'}>{t('users.usersList')}</Typography>
      {isError && (
        <Typography>An error happened. Please, try again later.</Typography>
      )}
      {isLoading && (
        <Box height={400}>
          <Loader />
        </Box>
      )}
      {isSuccess && <UserProfileList items={data.data} />}
    </>
  );
}
