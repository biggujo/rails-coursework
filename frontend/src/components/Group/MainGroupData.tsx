import { GroupEntity } from '../../interfaces';
import MyAvatar from '../MyAvatar/MyAvatar.tsx';
import { Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface Props {
  groupData: GroupEntity;
}

export default function MainGroupData({ groupData }: Props) {
  const { t } = useTranslation();

  return (
    <Stack direction={'row'} gap={4}>
      <MyAvatar
        alt={groupData.name}
        src={groupData.profile_photo}
        size={'large'}
        isGroup={true}
      />
      <Stack>
        <Stack direction={'row'} alignItems={'end'} gap={2}>
          <Typography variant={'h3'} color={'primary'}>
            {groupData.name}
          </Typography>
        </Stack>
        <Typography variant="subtitle1">
          <b>{t('group.description')}</b>: {groupData.description}
        </Typography>
      </Stack>
    </Stack>
  );
}
