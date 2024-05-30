import { GroupEntity } from '../../interfaces';
import MyAvatar from '../MyAvatar/MyAvatar.tsx';
import { Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface Props {
  data: GroupEntity;
}

export default function GroupCard({ data }: Props) {
  const navigate = useNavigate();

  return (
    <Stack
      direction={'row'}
      alignItems={'center'}
      my={2}
      gap={2}
      sx={{
        width: '-webkit-fill-available',
        cursor: 'pointer',
      }}
      onClick={() => navigate(`/group/${data.id}`)}
    >
      <MyAvatar alt={data.name} size={'small'} isGroup={true} />
      <Typography
        sx={{
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          width: '100%',
        }}
      >
        {`${data.name}`}{' '}
        <span
          style={{
            color: '#808080',
          }}
        >
          (members: {data.members_count})
        </span>
      </Typography>
    </Stack>
  );
}
