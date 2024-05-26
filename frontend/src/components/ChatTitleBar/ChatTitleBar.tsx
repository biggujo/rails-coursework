import { Grid, Typography } from '@mui/material';
import OnlineStatusChip from '../OnlineStatusChip';
import LoadingChip from '../LoadingChip/LoadingChip';

interface Props {
  title: string;
  isOnline?: boolean;
}

export default function ChatTitleBar({ title, isOnline }: Props) {
  return (
    <Grid container justifyContent={'space-between'} alignItems={'center'}>
      <Grid item>
        <Typography variant={'h6'} component={'h3'}>
          Name: {title}
        </Typography>
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
