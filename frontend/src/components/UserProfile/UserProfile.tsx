import { UserEntityExtended } from '../../interfaces';
import { Box, Button, List, ListItem, Stack, Typography } from '@mui/material';
import MyAvatar from '../MyAvatar/MyAvatar.tsx';
import { Edit } from '@mui/icons-material';
import DateConverters from '../../utils/date-converters.ts';

interface Props {
  userData: UserEntityExtended;
}

const createSubtitle = (text: string) => {
  return (
    <Typography variant={'h4'} component={'h3'} mt={2} marginBottom={1}>
      {text}
    </Typography>
  );
};

const MainData = ({ userData }: Props) => {
  const formattedJoinData = DateConverters.extractReadable(userData.updated_at);

  return (
    <Stack direction={'row'} gap={4}>
      <MyAvatar alt={userData.nickname} src={userData.profile_photo} />
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

const FriendsData = ({ friends }: Pick<UserEntityExtended, 'friends'>) => {
  const friendsInfo = [
    {
      title: 'Following',
      length: friends.following,
    },
    {
      title: 'Followers',
      length: friends.followers,
    },
    {
      title: 'Mutual friends',
      length: friends.friends,
    },
  ];

  return (
    <Box>
      <Stack direction={'row'} as={List}>
        {friendsInfo.map(({ title, length }) => (
          <ListItem
            sx={{
              p: 0,
              m: 0,
            }}
          >
            <Stack alignItems={'center'} width={'150px'}>
              <Typography variant={'h6'}>{length}</Typography>
              <Typography variant={'body2'}>{title}</Typography>
            </Stack>
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
        <FriendsData friends={userData.friends} />
      </Stack>

      <Button startIcon={<Edit />} variant="contained">
        Edit Profile
      </Button>
    </Stack>
  );
};

export default UserProfile;
