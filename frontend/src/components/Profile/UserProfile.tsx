import { UserProfile } from '../../interfaces';
import { Stack } from '@mui/material';
import createSubtitle from '../../utils/create-subtitle.tsx';
import { MainProfileData, FriendsData, UtilityButtons } from '.';

interface Props {
  userData: UserProfile;
}

const UserProfile = ({ userData }: Props) => {
  return (
    <Stack
      alignItems={'start'}
      direction={'row'}
      justifyContent={'space-between'}
    >
      <Stack direction={'column'}>
        {createSubtitle('Main information')}
        <MainProfileData userData={userData} />
        {createSubtitle('Connections')}
        <FriendsData userData={userData} />
      </Stack>
      <UtilityButtons userData={userData} />
    </Stack>
  );
};

export default UserProfile;
