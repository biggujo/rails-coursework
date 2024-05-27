import { Container, Typography } from '@mui/material';
import FormWrapper from '../components/FormWrapper/FormWrapper.tsx';

export default function PasswordResetRequest() {
  return (
    <Container component="main" maxWidth="xs">
      <Typography variant={'h3'}>
        <FormWrapper title={'Password Recovery Request'}></FormWrapper>
      </Typography>
    </Container>
  );
}
