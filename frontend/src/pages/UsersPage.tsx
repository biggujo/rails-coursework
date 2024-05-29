import { Box, Container, Typography } from '@mui/material';
import UserProfileList from '../components/UserProfileList/UserProfileList.tsx';
import useGetAllUsersQuery from '../hooks/query/useGetAllUsers.ts';
import Loader from '../components/Loader';

export default function UsersPage() {
  const { data, isLoading, isSuccess, isError } = useGetAllUsersQuery();

  return (
    <Container>
      <Typography variant={'h2'}>User list</Typography>
      {isError && (
        <Typography>An error happened. Please, try again later.</Typography>
      )}
      {isLoading && (
        <Box height={400}>
          <Loader />
        </Box>
      )}
      {isSuccess && <UserProfileList items={data.data} />}
    </Container>
  );
}
