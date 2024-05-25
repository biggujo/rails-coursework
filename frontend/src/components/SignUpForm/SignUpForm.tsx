import { Link as RouterLink } from 'react-router-dom';
import { Link, Stack, TextField } from '@mui/material';
import { FormikProvider } from 'formik';
import ButtonSubmit from '../ButtonSubmit';
import useSignUpForm from '../../hooks/useSignUpForm.tsx';

export default function SignUpForm() {
  const formik = useSignUpForm();

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
          <TextField id="nickname"
                     type="nickname"
                     name="nickname"
                     placeholder="1234"
                     label={'Nickname'}
                     required
                     value={formik.values.nickname}
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                     error={formik.touched.nickname && Boolean(formik.errors.nickname)}
                     helperText={formik.touched.nickname && formik.errors.nickname}
          />
          <Link component={RouterLink}
                to={'/sign-in'}
                variant="body2">
            {'Already have an account? Sign In'}
          </Link>
          <ButtonSubmit isSubmitting={formik.isSubmitting}>
            Submit
          </ButtonSubmit>
        </Stack>
      </form>
    </FormikProvider>
  );
}
