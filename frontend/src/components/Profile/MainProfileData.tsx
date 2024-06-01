import DateConverters from '../../utils/date-converters.ts';
import { Stack, Typography } from '@mui/material';
import MyAvatar from '../MyAvatar/MyAvatar.tsx';
import { UserProfile } from '../../interfaces';
import { useTranslation } from 'react-i18next';

interface Props {
  userData: UserProfile;
}

const MainProfileData = ({ userData }: Props) => {
  const formattedJoinData = DateConverters.extractReadable(userData.updated_at);
  const { t } = useTranslation();

  return (
    <Stack direction={'row'} gap={4}>
      <MyAvatar
        alt={userData.nickname}
        src={userData.profile_photo}
        size={'large'}
      />
      <Stack>
        <Stack direction={'row'} alignItems={'end'} gap={2}>
          <Typography variant={'h3'} color={'primary'}>
            {userData.nickname}
          </Typography>
          <Typography variant={'h4'} color={'gray'}>
            a.k.a. {userData.full_name}
          </Typography>
        </Stack>
        <Typography variant="subtitle1">
          <b>{t('profile.email')}</b>: {userData.email}
        </Typography>
        <Typography variant="subtitle1">
          <b>{t('profile.location')}</b>: {userData.city}, {userData.country}
        </Typography>
        <Typography variant="subtitle1">
          <b>{t('profile.joinedOn')}</b>: {formattedJoinData}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default MainProfileData;
