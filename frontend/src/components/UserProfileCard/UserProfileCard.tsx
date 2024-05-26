import { User } from '../../interfaces';
import { Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface Props {
  data: User;
}

export default function UserProfileCard({ data: { id, nickname } }: Props) {
  const navigate = useNavigate();

  return (
    <Stack direction={'row'}>
      <Typography>User: {nickname}</Typography>
      <Button onClick={() => navigate(`/chat/${id}`)}>Chat</Button>
    </Stack>
  );
}
