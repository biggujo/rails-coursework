import { Container } from '@mui/material';
import SignInForm from '../components/SignInForm';
import FormWrapper from '../components/FormWrapper/FormWrapper.tsx';
import { useTranslation } from 'react-i18next';

export default function SignInPage() {
  const { t } = useTranslation();

  return (
    <Container component="main" maxWidth="xs">
      <FormWrapper title={t('signIn.formName')}>
        <SignInForm />
      </FormWrapper>
    </Container>
  );
}
