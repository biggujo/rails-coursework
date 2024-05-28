import { Container, Typography } from '@mui/material';
import FormWrapper from '../components/FormWrapper/FormWrapper.tsx';
import PasswordRecoveryRequestForm from '../components/PasswordRecoveryRequestForm/PasswordRecoveryRequestForm.tsx';

export default function PasswordResetRequestPage() {
  return (
    <Container component="main" maxWidth="xs">
      <Typography variant={'h3'}>
        <FormWrapper title={'Password Recovery Request'}>
          <PasswordRecoveryRequestForm />
        </FormWrapper>
      </Typography>
    </Container>
  );
}
