import { useAuth } from '../providers';
import { Box, Button, Container, Typography } from '@mui/material';
import useGetProfileQuery from '../hooks/query/useGetProfileQuery.ts';
import { useEffect } from 'react';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const navigate = useNavigate();
  const profileQuery = useGetProfileQuery({
    enabled: false,
  });
  const { isLoggedIn, user } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    const fetch = async () => {
      try {
        await profileQuery.refetch();

        const response = profileQuery.data;

        console.log(response);
      } catch (e) {
        if (e instanceof AxiosError || e instanceof Error) {
          toast.error(e.message);
          return;
        }

        console.log(e);
      }
    };

    fetch();
  }, []);

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

  console.log(user);

  return (<Container>
    <Box>
      {profileQuery.isFetching && <Typography>Loading...</Typography>}
      {profileQuery.isSuccess && <><Typography variant={'h2'}>Profile</Typography>
        <Typography>Email: <b>{user.email}</b></Typography>
      </>}
    </Box>
  </Container>);
};
