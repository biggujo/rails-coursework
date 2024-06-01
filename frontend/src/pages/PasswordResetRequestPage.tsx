import { Container, Typography } from '@mui/material';
import FormWrapper from '../components/FormWrapper/FormWrapper.tsx';
import PasswordRecoveryRequestForm from '../components/PasswordRecoveryRequestForm/PasswordRecoveryRequestForm.tsx';
import { useTranslation } from 'react-i18next';

export default function PasswordResetRequestPage() {
  const { t } = useTranslation();

  return (
    <Container component="main" maxWidth="xs">
      <Typography variant={'h3'}>
        <FormWrapper title={t('passwordRecovery.requestForm')}>
          <PasswordRecoveryRequestForm />
        </FormWrapper>
      </Typography>
    </Container>
  );
}
