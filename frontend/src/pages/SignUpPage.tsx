import { Navigate } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';
import { useAuth } from '../providers';
import SignUpForm from '../components/SignUpForm';

export default function SignUpPage() {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Navigate to={'/'} />;
  }

  return (<>
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
        }}
      >
        <Typography variant={'h5'}
                    component={'h2'}
                    align={'center'}
                    sx={{ mb: 4 }}>Sign Up</Typography>
        <SignUpForm />
      </Box>
    </Container>
  </>);
}
