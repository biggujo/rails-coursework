import useFetchUserListQuery from '../hooks/query/useFetchUserListQuery.ts';
import API from '../utils/api.ts';
import { useSelector } from 'react-redux';
import { selectAuthUser } from '../redux/auth/selectors.ts';
import { Box, Typography } from '@mui/material';
import createSubtitle from '../utils/create-subtitle.tsx';
import Loader from '../components/Loader';
import UserProfileList from '../components/UserProfileList/UserProfileList.tsx';

export default function MyFriendsPage() {
  const currentUser = useSelector(selectAuthUser);
  const { data, isLoading, isSuccess, isError } = useFetchUserListQuery(
    API.user.friends.fetchFriends(currentUser.id),
    true
  );

  return (
    <>
      {isError && (
        <Typography>An error has happened. Please, try again later.</Typography>
      )}
      {createSubtitle('My Friends')}
      <Box height={'400px'}>
        {isLoading && <Loader />}
        {isSuccess && data.length === 0 && (
          <Typography>No users available.</Typography>
        )}
        {isSuccess && (
          <UserProfileList items={data} shouldShowCurrentUser={true} />
        )}
      </Box>
    </>
  );
}
