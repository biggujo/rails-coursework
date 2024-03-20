import { useNavigate } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';
import { useAuth } from '../providers';
import axios from 'axios';
import { getFormSubmissionInfo } from 'react-router-dom/dist/dom';


export default function HomePage() {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();

  return (<>
    <Container>
      <Typography variant={'h1'}>Home Page</Typography>
      <Typography>Current user: <b>{user?.email ? user.email : 'No user'}</b></Typography>
      <Typography>Token: {axios.defaults.headers.common.Authorization}</Typography>
      <Button onClick={() => navigate('/profile')}
              variant={'contained'} color={'secondary'}>
        Profile
      </Button>
      <Button onClick={() => navigate('/sign-in')}
              variant={'contained'}
              disabled={isLoggedIn}>
        Sign in
      </Button>
    </Container>
  </>);
}
