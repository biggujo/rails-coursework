import { useNavigate } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';
import {
  selectAuthIsLoggedIn,
  selectAuthToken,
  selectAuthUser,
} from '../redux/auth/selectors.ts';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../redux/store.ts';
import AuthOperations from '../redux/auth/operations.ts';

export default function HomePage() {
  const dispatch: AppDispatch = useDispatch();
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);
  const token = useSelector(selectAuthToken);
  const user = useSelector(selectAuthUser);
  const navigate = useNavigate();

  return (
    <>
      <Container>
        <Typography variant={'h1'}>Home Page</Typography>
        <Typography>
          Current user: <b>{user?.email ? user.email : 'No user'}</b>
        </Typography>
        <Typography>Token: {token}</Typography>
        <Button
          onClick={() => navigate(`/profile/${user.id}`)}
          variant={'contained'}
          color={'secondary'}
        >
          Profile
        </Button>
        <Button
          onClick={() => navigate('/users')}
          variant={'contained'}
          color={'secondary'}
        >
          All users
        </Button>
        <Button
          onClick={() => navigate('/groups')}
          variant={'contained'}
          color={'secondary'}
        >
          All groups
        </Button>
        <Button
          onClick={() => navigate('/chat')}
          variant={'contained'}
          color={'secondary'}
        >
          Chat
        </Button>
        <Button
          onClick={() => navigate('/sign-in')}
          variant={'contained'}
          disabled={isLoggedIn}
        >
          Sign in
        </Button>
        <Button
          onClick={() => navigate('/sign-up')}
          variant={'contained'}
          disabled={isLoggedIn}
        >
          Sign up
        </Button>
        <Button
          onClick={() => {
            dispatch(AuthOperations.signOut());
          }}
          variant={'contained'}
          disabled={!isLoggedIn}
        >
          Sign out
        </Button>
      </Container>
    </>
  );
}
