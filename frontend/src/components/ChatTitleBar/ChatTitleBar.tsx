import { Grid, Stack, Typography } from '@mui/material';
import OnlineStatusChip from '../OnlineStatusChip';
import LoadingChip from '../LoadingChip/LoadingChip';
import MyAvatar from '../MyAvatar/MyAvatar.tsx';
import { useNavigate } from 'react-router-dom';

interface Props {
  id: number;
  title: string;
  isOnline?: boolean;
  avatarSrc?: string;
}

export default function ChatTitleBar({
  id,
  title,
  isOnline,
  avatarSrc,
}: Props) {
  const navigate = useNavigate();
  return (
    <Grid container justifyContent={'space-between'} alignItems={'center'}>
      <Grid item>
        {/* @ts-expect-error of bad TS typing */}
        <Stack
          gap={2}
          direction={'row'}
          alignItems={'center'}
          onClick={id && (() => navigate(`/profile/${id}`))}
          sx={{
            cursor: 'pointer',
          }}
        >
          <MyAvatar alt={title} size={'small'} src={avatarSrc} />
          <Typography variant={'h6'} component={'h3'}>
            Name: {title}
          </Typography>
        </Stack>
      </Grid>
      <Grid item>
        {typeof isOnline === 'undefined' && <LoadingChip />}
        {typeof isOnline !== 'undefined' && (
          <OnlineStatusChip isOnline={isOnline} />
        )}
      </Grid>
    </Grid>
  );
}
