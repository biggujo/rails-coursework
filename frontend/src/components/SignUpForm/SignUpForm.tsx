import { Link as RouterLink } from 'react-router-dom';
import { Link, Stack, TextField } from '@mui/material';
import { FormikProvider } from 'formik';
import ButtonSubmit from '../ButtonSubmit';
import useSignUpForm from '../../hooks/forms/useSignUpForm.tsx';

export default function SignUpForm() {
  const formik = useSignUpForm();

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>
        <Stack gap={4} alignItems={'stretch'}>
          <TextField
            placeholder="cage@acme.com"
            label={'Email address'}
            required
            {...formik.getFieldProps('email')}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            type="text"
            placeholder={'johnny_cage'}
            label={'Nickname'}
            required
            {...formik.getFieldProps('nickname')}
            error={formik.touched.nickname && Boolean(formik.errors.nickname)}
            helperText={formik.touched.nickname && formik.errors.nickname}
          />
          <TextField
            type="text"
            placeholder={'johnny_cage'}
            label={'Full Name'}
            required
            {...formik.getFieldProps('full_name')}
            error={formik.touched.full_name && Boolean(formik.errors.full_name)}
            helperText={formik.touched.full_name && formik.errors.full_name}
          />
          <TextField
            type="text"
            placeholder={'Ukraine'}
            label={'Country'}
            required
            {...formik.getFieldProps('country')}
            error={formik.touched.country && Boolean(formik.errors.country)}
            helperText={formik.touched.country && formik.errors.country}
          />
          <TextField
            type="text"
            placeholder={'Kyiv'}
            label={'City'}
            required
            {...formik.getFieldProps('city')}
            error={formik.touched.city && Boolean(formik.errors.city)}
            helperText={formik.touched.city && formik.errors.city}
          />
          <TextField
            type="password"
            placeholder="1234"
            label={'Password'}
            required
            {...formik.getFieldProps('password')}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Link component={RouterLink} to={'/sign-in'} variant="body2">
            {'Already have an account? Sign In'}
          </Link>
          <ButtonSubmit isSubmitting={formik.isSubmitting}>Submit</ButtonSubmit>
        </Stack>
      </form>
    </FormikProvider>
  );
}
