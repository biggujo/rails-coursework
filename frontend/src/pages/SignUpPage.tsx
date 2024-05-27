import { Container } from '@mui/material';
import SignUpForm from '../components/SignUpForm';
import FormWrapper from '../components/FormWrapper/FormWrapper.tsx';

export default function SignUpPage() {
  return (
    <>
      <Container component="main" maxWidth="xs">
        <FormWrapper title={'Sign Up'}>
          <SignUpForm />
        </FormWrapper>
      </Container>
    </>
  );
}
