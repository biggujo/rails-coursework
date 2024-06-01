import { Stack, TextField } from '@mui/material';
import usePasswordRecoveryRequestForm from '../../hooks/forms/usePasswordRecoveryRequestForm.ts';
import { FormikProvider } from 'formik';
import ButtonSubmit from '../ButtonSubmit';
import { useTranslation } from 'react-i18next';

export default function PasswordRecoveryRequestForm() {
  const formik = usePasswordRecoveryRequestForm();
  const { t } = useTranslation();

  return (
    <FormikProvider value={formik}>
      <Stack
        component={'form'}
        onSubmit={event => {
          event.preventDefault();
          formik.submitForm();
        }}
        gap={4}
        alignItems={'stretch'}
      >
        <TextField
          label={t('form.email')}
          placeholder={'cage@acme.com'}
          {...formik.getFieldProps('email')}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          required
        />
        <ButtonSubmit isSubmitting={formik.isSubmitting}>
          {t('form.requestRecoverySubmit')}
        </ButtonSubmit>
      </Stack>
    </FormikProvider>
  );
}
