import { Container, Typography } from '@mui/material';
import FormWrapper from '../components/FormWrapper/FormWrapper.tsx';
import PasswordRecoveryRecoveryForm from '../components/PasswordRecoveryRecoveryForm';
import { Navigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function PasswordResetRecoveryPage() {
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();

  const confirmToken = searchParams.get('reset_password_token') as string;

  if (!confirmToken) {
    return <Navigate to={'/'} />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <Typography variant={'h3'}>
        <FormWrapper title={t('passwordRecovery.processionForm')}>
          <PasswordRecoveryRecoveryForm confirmToken={confirmToken} />
        </FormWrapper>
      </Typography>
    </Container>
  );
}
