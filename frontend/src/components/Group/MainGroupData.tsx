import { GroupEntity } from '../../interfaces';
import MyAvatar from '../MyAvatar/MyAvatar.tsx';
import { Stack, Typography } from '@mui/material';

interface Props {
  groupData: GroupEntity;
}

export default function MainGroupData({ groupData }: Props) {
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
          <b>Description</b>: {groupData.description}
        </Typography>
      </Stack>
    </Stack>
  );
}
