import { GroupEntity } from '../../interfaces';
import MyAvatar from '../MyAvatar/MyAvatar.tsx';
import { Stack, Typography } from '@mui/material';

interface Props {
  groupData: GroupEntity;
}

export default function MainGroupDate({ groupData }: Props) {
  return (
    <Stack direction={'row'} gap={4}>
      <MyAvatar alt={groupData.name} size={'large'} isGroup={true} />
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
