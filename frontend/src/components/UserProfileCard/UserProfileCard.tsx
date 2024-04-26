import { User } from '../../interfaces';
import { Box, Button, Stack, Typography } from '@mui/material';

interface Props {
  data: User;
}

export default function UserProfileCard({ data: { id, nickname } }: Props) {
  return (
    <Stack direction={'row'}>
      <Typography>User: {nickname}</Typography>
      <Button>Chat</Button>
    </Stack>
  );
}
