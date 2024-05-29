import { UserEntityExtended } from '../../interfaces';
import { Stack } from '@mui/material';
import createSubtitle from '../../utils/create-subtitle.tsx';
import { MainData, FriendsData, UtilityButtons } from '.';

interface Props {
  userData: UserEntityExtended;
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
        <MainData userData={userData} />
        {createSubtitle('Connections')}
        <FriendsData userData={userData} />
      </Stack>
      <UtilityButtons userData={userData} />
    </Stack>
  );
};

export default UserProfile;
