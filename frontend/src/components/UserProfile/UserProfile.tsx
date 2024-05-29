import { UserEntityExtended } from '../../interfaces';
import {
  Box,
  Button,
  ListItem,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import MyAvatar from '../MyAvatar/MyAvatar.tsx';
import { Edit } from '@mui/icons-material';
import DateConverters from '../../utils/date-converters.ts';
import FetchUsersModal from '../FetchUsersModal/FetchUsersModal.tsx';
import API from '../../utils/api.ts';
import createSubtitle from '../../utils/create-subtitle.tsx';

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

const MainData = ({ userData }: Props) => {
  const formattedJoinData = DateConverters.extractReadable(userData.updated_at);

  return (
    <Stack direction={'row'} gap={4}>
      <MyAvatar
        alt={userData.nickname}
        src={userData.profile_photo}
        size={'large'}
      />
      <Stack>
        <Stack direction={'row'} alignItems={'end'} gap={2}>
          <Typography variant={'h3'}>{userData.nickname}</Typography>
          <Typography variant={'h4'} color={'gray'}>
            a.k.a. {userData.full_name}
          </Typography>
        </Stack>
        <Typography variant="subtitle1">
          <b>Email</b>: {userData.email}
        </Typography>
        <Typography variant="subtitle1">
          <b>Location</b>: {userData.city}, {userData.country}
        </Typography>
        <Typography variant="subtitle1">
          <b>Joined on</b>: {formattedJoinData}
        </Typography>
      </Stack>
    </Stack>
  );
};

const FriendsData = ({ userData }: { userData: UserEntityExtended }) => {
  const theme = useTheme();

  const friendsInfo = createFriendsInfo(userData);

  return (
    <Box>
      <Stack direction={'row'}>
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
                  <Typography variant={'h6'}>{length}</Typography>
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

const UserProfile = ({ userData }: Props) => {
  return (
    <Stack
      alignItems={'start'}
      direction={'row'}
      justifyContent={'space-between'}
    >
      <Stack direction={'column'}>
        {createSubtitle('Main information')}
        <MainData userData={userData} />
        {createSubtitle('Connections')}
        <FriendsData userData={userData} />
      </Stack>

      <Button startIcon={<Edit />} variant="contained">
        Edit Profile
      </Button>
    </Stack>
  );
};

export default UserProfile;
