import { Container } from '@mui/material';
import SignInForm from '../components/SignInForm';
import FormWrapper from '../components/FormWrapper/FormWrapper.tsx';

export default function SignInPage() {
  return (
    <>
      <Container component="main" maxWidth="xs">
        <FormWrapper title={'Sign In'}>
          <SignInForm />
        </FormWrapper>
      </Container>
    </>
  );
}
