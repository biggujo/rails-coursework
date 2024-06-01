import { Link as RouterLink } from 'react-router-dom';
import { Link, Stack, TextField } from '@mui/material';
import { FormikProvider } from 'formik';
import ButtonSubmit from '../ButtonSubmit';
import useSignUpForm from '../../hooks/forms/useSignUpForm.tsx';
import { useTranslation } from 'react-i18next';

export default function SignUpForm() {
  const formik = useSignUpForm();
  const { t } = useTranslation();

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>
        <Stack gap={4} alignItems={'stretch'}>
          <TextField
            placeholder="cage@acme.com"
            label={t('form.email')}
            required
            {...formik.getFieldProps('email')}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            type="text"
            placeholder={'johnny_cage'}
            label={t('form.nickname')}
            required
            {...formik.getFieldProps('nickname')}
            error={formik.touched.nickname && Boolean(formik.errors.nickname)}
            helperText={formik.touched.nickname && formik.errors.nickname}
          />
          <TextField
            type="text"
            placeholder={'johnny_cage'}
            label={t('form.fullName')}
            required
            {...formik.getFieldProps('full_name')}
            error={formik.touched.full_name && Boolean(formik.errors.full_name)}
            helperText={formik.touched.full_name && formik.errors.full_name}
          />
          <TextField
            type="text"
            placeholder={t('form.countryPlaceholder')}
            label={t('form.country')}
            required
            {...formik.getFieldProps('country')}
            error={formik.touched.country && Boolean(formik.errors.country)}
            helperText={formik.touched.country && formik.errors.country}
          />
          <TextField
            type="text"
            placeholder={t('form.cityPlaceholder')}
            label={t('form.city')}
            required
            {...formik.getFieldProps('city')}
            error={formik.touched.city && Boolean(formik.errors.city)}
            helperText={formik.touched.city && formik.errors.city}
          />
          <TextField
            type="password"
            placeholder="1234"
            label={t('form.password')}
            required
            {...formik.getFieldProps('password')}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Link component={RouterLink} to={'/sign-in'} variant="body2">
            {t('form.alreadyHaveAnAccount')}
          </Link>
          <ButtonSubmit isSubmitting={formik.isSubmitting}>
            {t('form.submit')}
          </ButtonSubmit>
        </Stack>
      </form>
    </FormikProvider>
  );
}
