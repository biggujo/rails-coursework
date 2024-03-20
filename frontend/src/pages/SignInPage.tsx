import { useNavigate } from 'react-router-dom';
import { FormikProvider } from 'formik';
import { Box, Button, Container, Stack, TextField, Typography } from '@mui/material';
import useSignInForm from '../hooks/useSignInForm.ts';

export default function SignInPage() {
  const navigate = useNavigate();
  const formik = useSignInForm();

  return (<>
    <Container>
      <Button onClick={() => navigate('/')}>Go home</Button>
      <Typography variant={'h2'}>Sign in</Typography>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <Stack direction={'column'} gap={2} alignItems={'start'}>
            <Box>
              <Typography htmlFor="email"
                          variant={'body1'}
                          component={'label'}>
                Email
              </Typography>
              <TextField
                id="email"
                name="email"
                placeholder="jane@acme.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Box>

            <Box>
              <Typography htmlFor="password"
                          variant={'body1'}
                          component={'label'}>
                Password
              </Typography>
              <TextField id="password"
                         type="password"
                         name="password"
                         placeholder="12345"
                         value={formik.values.password}
                         onChange={formik.handleChange}
                         onBlur={formik.handleBlur}
                         error={formik.touched.password && Boolean(formik.errors.password)}
                         helperText={formik.touched.password && formik.errors.password}
              />
            </Box>
            <Button type="submit" variant={'contained'}>Submit</Button>
          </Stack>
        </form>
      </FormikProvider>
    </Container>
  </>);
}
