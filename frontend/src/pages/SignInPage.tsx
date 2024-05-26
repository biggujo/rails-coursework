import { Box, Container, Typography } from '@mui/material';
import SignInForm from '../components/SignInForm';

export default function SignInPage() {
  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
          }}
        >
          <Typography
            variant={'h5'}
            component={'h2'}
            align={'center'}
            sx={{ mb: 4 }}
          >
            Sign In
          </Typography>
          <SignInForm />
        </Box>
      </Container>
    </>
  );
}
