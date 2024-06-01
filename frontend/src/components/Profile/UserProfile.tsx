import { UserProfile } from '../../interfaces';
import { Stack } from '@mui/material';
import createSubtitle from '../../utils/create-subtitle.tsx';
import { MainProfileData, FriendsData, UtilityButtons } from '.';
import { useTranslation } from 'react-i18next';

interface Props {
  userData: UserProfile;
}

const UserProfile = ({ userData }: Props) => {
  const { t } = useTranslation();

  return (
    <Stack
      alignItems={'start'}
      direction={'row'}
      justifyContent={'space-between'}
    >
      <Stack direction={'column'}>
        {createSubtitle(t('profile.profile'))}
        <MainProfileData userData={userData} />
        {createSubtitle(t('profile.connections'))}
        <FriendsData userData={userData} />
      </Stack>
      <UtilityButtons userData={userData} />
    </Stack>
  );
};

export default UserProfile;
