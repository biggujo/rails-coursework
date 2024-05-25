import { Avatar, Box, Grid, Typography } from '@mui/material';
import DateFormatter from '../../utils/date-formatter.ts';

interface Props {
  body: string;
  date: string;
  variant: 'messageLeft' | 'messageRight';
}

export default function MessageItem({ body, date, variant }: Props) {
  return (
    <Grid
      container
      direction={variant === 'messageRight' ? 'row-reverse' : 'row'}
      flexWrap={'nowrap'}
      alignItems={'end'}
    >
      <Grid item>
        <Avatar>{'T'}</Avatar>
      </Grid>
      <Grid item className={variant}>
        <Typography>{body}</Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: variant === 'messageRight' ? 'end' : 'start',
            mt: 1,
          }}
        >
          <Typography variant={'caption'}>
            {DateFormatter.formatMessageDate(date)}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
