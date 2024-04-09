import { Link as RouterLink } from 'react-router-dom';
import { FormikProvider } from 'formik';
import { Link, Stack, TextField } from '@mui/material';
import ButtonSubmit from '../ButtonSubmit';
import useSignInForm from '../../hooks/useSignInForm.tsx';

export default function SignInForm() {
  const formik = useSignInForm();

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>
        <Stack gap={4} alignItems={'stretch'}>
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
          <Link component={RouterLink}
                to={'/sign-up'}
                variant="body2">
            {'Don\'t have an account? Sign Up'}
          </Link>
          <ButtonSubmit isSubmitting={formik.isSubmitting}>
            Submit
          </ButtonSubmit>
        </Stack>
      </form>
    </FormikProvider>
  );
}
