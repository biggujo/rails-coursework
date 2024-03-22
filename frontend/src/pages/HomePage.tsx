import { useNavigate } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';
import { useAuth } from '../providers';
import useSignOutMutation from '../hooks/mutation/useSignOutMutation.tsx';
import useToken from '../hooks/useToken.ts';


export default function HomePage() {
  const { isLoggedIn, user } = useAuth();
  const [token] = useToken();
  const signOutMutation = useSignOutMutation();
  const navigate = useNavigate();

  return (<>
    <Container>
      <Typography variant={'h1'}>Home Page</Typography>
      <Typography>Current user: <b>{user?.email ? user.email : 'No user'}</b></Typography>
      <Typography>Token: {token}</Typography>
      <Button onClick={() => navigate('/profile')}
              variant={'contained'} color={'secondary'}>
        Profile
      </Button>
      <Button onClick={() => navigate('/sign-in')}
              variant={'contained'}
              disabled={isLoggedIn}>
        Sign in
      </Button>
      <Button onClick={() => signOutMutation.mutate()}
              variant={'contained'}
              disabled={!isLoggedIn}>
        Sign out
      </Button>
    </Container>
  </>);
}
