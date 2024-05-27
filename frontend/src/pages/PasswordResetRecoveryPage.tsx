import { Container, Typography } from '@mui/material';
import FormWrapper from '../components/FormWrapper/FormWrapper.tsx';
import PasswordRecoveryRecoveryForm from '../components/PasswordRecoveryRecoveryForm';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';

export default function PasswordResetRecoveryPage() {
  const [searchParams] = useSearchParams();

  const confirmToken = searchParams.get('reset_password_token') as string;

  if (!confirmToken) {
    return <Navigate to={'/'} />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <Typography variant={'h3'}>
        <FormWrapper title={'Password Recovery'}>
          <PasswordRecoveryRecoveryForm confirmToken={confirmToken} />
        </FormWrapper>
      </Typography>
    </Container>
  );
}
