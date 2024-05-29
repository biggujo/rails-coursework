import { IconButton, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CreateIcon from '@mui/icons-material/Create';
import { ComponentType, MouseEventHandler } from 'react';
import MyAvatar from '../MyAvatar/MyAvatar.tsx';
import UserEntity from '../../interfaces/UserEntity.interface.ts';

interface Props {
  data: UserEntity;
}

const CardIconButton = ({
  onClick,
  iconComponent: IconComponent,
}: {
  onClick?: ((event: MouseEventHandler<HTMLAnchorElement>) => void) | undefined;
  iconComponent: ComponentType;
}) => {
  return (
    // @ts-expect-error of bad MUI typing
    <IconButton onClick={onClick} size={'small'}>
      <IconComponent />
    </IconButton>
  );
};

export default function UserProfileCard({
  data: { id, nickname, profile_photo, full_name },
}: Props) {
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
      onClick={() => navigate(`/profile/${id}`)}
    >
      <MyAvatar alt={nickname} src={profile_photo} size={'small'} />
      <Typography
        sx={{
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          width: '100%',
        }}
      >
        {`${nickname}`}{' '}
        <span
          style={{
            color: '#808080',
          }}
        >
          ({full_name})
        </span>
      </Typography>
      <CardIconButton
        onClick={event => {
          // @ts-expect-error as TS doesn't know about this
          event.stopPropagation();
          navigate(`/chat/${id}`);
        }}
        iconComponent={CreateIcon}
      />
    </Stack>
  );
}
