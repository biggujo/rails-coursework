import { useAuth } from '../providers';
import { Box, Button, Container, Typography } from '@mui/material';
import useGetProfileQuery from '../hooks/query/useGetProfileQuery.ts';
import { useNavigate } from 'react-router-dom';
import useCheckSessionExpiration from '../hooks/useCheckSessionExpiration.tsx';
import { AxiosError } from 'axios';

export default function ProfilePage() {
  const navigate = useNavigate();
  const profileQuery = useGetProfileQuery();
  const { isLoggedIn, user } = useAuth();
  useCheckSessionExpiration(profileQuery.error);

  if (!isLoggedIn) {
    return <Container>
      <Box>
        <Typography variant={'h2'}>Profile</Typography>
        <Typography>
          You need to sign in first
        </Typography>
        <Button onClick={() => navigate('/sign-in')}
                variant={'contained'}>
          Sign in
        </Button>
      </Box>
    </Container>;
  }

  return (<Container>
    <Box>
      <Typography variant={'h2'}>Profile</Typography>
      {profileQuery.isError && <Typography>{(profileQuery.error as AxiosError).response!.statusText}</Typography>}
      {profileQuery.isSuccess && <ul>
        <li>
          <Typography>Email: <b>{profileQuery.data.data.email}</b></Typography>
        </li>
        <li>
          <Typography>Nickname: <b>{profileQuery.data.data.nickname}</b></Typography>
        </li>
      </ul>}
    </Box>
  </Container>);
}
