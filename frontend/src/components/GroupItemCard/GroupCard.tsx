import { GroupEntity } from '../../interfaces';
import MyAvatar from '../MyAvatar/MyAvatar.tsx';
import { Stack, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthUser } from '../../redux/auth/selectors.ts';

interface Props {
  data: GroupEntity;
}

export default function GroupCard({ data }: Props) {
  const theme = useTheme();
  const navigate = useNavigate();
  const currentUser = useSelector(selectAuthUser);

  const isCurrentUserGroupOwner = currentUser.id === data.user.id;

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
      <MyAvatar
        alt={data.name}
        src={data.profile_photo}
        size={'small'}
        isGroup={true}
      />
      <Typography
        sx={{
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          width: '100%',
        }}
      >
        <Stack
          component={'span'}
          direction={'row'}
          justifyContent={'space-between'}
        >
          <span>
            <span>{`${data.name}`} </span>
            <span
              style={{
                color: '#808080',
              }}
            >
              (members: {data.members_count})
            </span>
          </span>
          {isCurrentUserGroupOwner && (
            <span
              style={{
                color: theme.palette.primary.main,
              }}
            >
              {' '}
              [Owner]
            </span>
          )}
        </Stack>
      </Typography>
    </Stack>
  );
}
