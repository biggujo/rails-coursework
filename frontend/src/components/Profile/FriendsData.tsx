import { Box, ListItem, Stack, Typography, useTheme } from '@mui/material';
import FetchUsersModal from '../FetchUsersModal/FetchUsersModal.tsx';
import { UserEntityExtended } from '../../interfaces';
import API from '../../utils/api.ts';

interface Props {
  userData: UserEntityExtended;
}

const createFriendsInfo = (userData: UserEntityExtended) => [
  {
    title: `Following`,
    length: userData.friends.following,
    apiFn: API.user.friends.fetchFollowing,
  },
  {
    title: `Followers`,
    length: userData.friends.followers,
    apiFn: API.user.friends.fetchFollowers,
  },
  {
    title: `Friends`,
    length: userData.friends.friends,
    apiFn: API.user.friends.fetchFriends,
  },
];

const FriendsData = ({ userData }: Props) => {
  const theme = useTheme();

  const friendsInfo = createFriendsInfo(userData);

  return (
    <Box>
      <Stack direction={'row'} gap={0}>
        {friendsInfo.map(({ title, length, apiFn }, index) => (
          <ListItem
            key={index}
            sx={{
              p: 0,
              m: 0,
              cursor: 'pointer',
              '&:hover': {
                color: theme.palette.primary.main,
              },
            }}
          >
            <FetchUsersModal
              apiFn={apiFn(userData.id)}
              title={title}
              toggler={
                <Stack alignItems={'center'} width={'150px'}>
                  <Typography variant={'h6'} color={'primary'}>
                    {length}
                  </Typography>
                  <Typography variant={'body2'}>{title}</Typography>
                </Stack>
              }
            />
          </ListItem>
        ))}
      </Stack>
    </Box>
  );
};

export default FriendsData;
