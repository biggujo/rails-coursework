import { Navigate, useNavigate } from 'react-router-dom';
import { FormikProvider } from 'formik';
import { Box, Container, Link, Stack, TextField, Typography } from '@mui/material';
import useSignInForm from '../hooks/useSignInForm.tsx';
import { useAuth } from '../providers';
import ButtonSubmit from '../components/ButtonSubmit';

export default function SignInPage() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const formik = useSignInForm();

  if (isLoggedIn) {
    return <Navigate to={'/'} />;
  }

  return (<>
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
        }}
      >
        <Typography variant={'h5'}
                    component={'h2'}
                    align={'center'}
                    sx={{ mb: 4 }}>Sign In</Typography>
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <Stack gap={4} alignItems={'stretch'}>
              <Stack gap={2}>
                <TextField
                  id="email"
                  name="email"
                  placeholder="jane@acme.com"
                  value={formik.values.email}
                  label={'Email address'}
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Stack>

              <Stack>
                <TextField id="password"
                           type="password"
                           name="password"
                           placeholder="1234"
                           label={'Password'}
                           required
                           value={formik.values.password}
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                           error={formik.touched.password && Boolean(formik.errors.password)}
                           helperText={formik.touched.password && formik.errors.password}
                />
              </Stack>
              <Link href="" onClick={(event) => {
                event.preventDefault();
                navigate('/sign-up');
              }} variant="body2">
                {'Don\'t have an account? Sign Up'}
              </Link>
              <ButtonSubmit isSubmitting={formik.isSubmitting}>
                Submit
              </ButtonSubmit>
            </Stack>
          </form>
        </FormikProvider>
      </Box>
    </Container>
  </>);
}
