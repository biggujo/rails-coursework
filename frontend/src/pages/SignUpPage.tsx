import { Container } from '@mui/material';
import SignUpForm from '../components/SignUpForm';
import FormWrapper from '../components/FormWrapper/FormWrapper.tsx';
import { useTranslation } from 'react-i18next';

export default function SignUpPage() {
  const { t } = useTranslation();

  return (
    <Container component="main" maxWidth="xs">
      <FormWrapper title={t('signUp.formName')}>
        <SignUpForm />
      </FormWrapper>
    </Container>
  );
}
