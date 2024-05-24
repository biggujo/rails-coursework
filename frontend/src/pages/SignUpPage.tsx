import { Box, Container, Typography } from '@mui/material';
import SignUpForm from '../components/SignUpForm';

export default function SignUpPage() {
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
            Sign Up
          </Typography>
          <SignUpForm />
        </Box>
      </Container>
    </>
  );
}
