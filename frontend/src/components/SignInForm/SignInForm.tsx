import { Link as RouterLink } from 'react-router-dom';
import { FormikProvider } from 'formik';
import { Link, Stack, TextField } from '@mui/material';
import ButtonSubmit from '../ButtonSubmit';
import useSignInForm from '../../hooks/forms/useSignInForm.tsx';
import { useTranslation } from 'react-i18next';

export default function SignInForm() {
  const formik = useSignInForm();
  const { t } = useTranslation();

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>
        <Stack gap={4} alignItems={'stretch'}>
          <TextField
            id="email"
            name="email"
            placeholder="jane@acme.com"
            value={formik.values.email}
            label={t('form.email')}
            required
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            id="password"
            type="password"
            name="password"
            placeholder="1234"
            label={t('form.password')}
            required
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Link component={RouterLink} to={'/sign-up'} variant="body2">
            {t('form.dontHaveAnAccount')}
          </Link>
          <Link
            component={RouterLink}
            to={'/password/reset/request'}
            variant="body2"
          >
            {t('form.forgotPassword')}
          </Link>
          <ButtonSubmit isSubmitting={formik.isSubmitting}>
            {t('form.submit')}
          </ButtonSubmit>
        </Stack>
      </form>
    </FormikProvider>
  );
}
