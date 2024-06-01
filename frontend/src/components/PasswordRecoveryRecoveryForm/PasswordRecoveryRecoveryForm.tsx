import { FormikProvider } from 'formik';
import usePasswordResetRecoveryForm from '../../hooks/forms/usePasswordResetRecoveryForm.ts';
import { Stack, TextField } from '@mui/material';
import ButtonSubmit from '../ButtonSubmit';
import { useTranslation } from 'react-i18next';

interface Props {
  confirmToken: string;
}

export default function PasswordRecoveryRecoveryForm({ confirmToken }: Props) {
  const formik = usePasswordResetRecoveryForm({
    confirmToken,
  });
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
          label={t('form.newPassword')}
          type={'password'}
          {...formik.getFieldProps('password')}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          required
        />
        <TextField
          label={t('form.confirmNewPassword')}
          type={'password'}
          {...formik.getFieldProps('confirmPassword')}
          error={
            formik.touched.confirmPassword &&
            Boolean(formik.errors.confirmPassword)
          }
          helperText={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
          required
        />
        <ButtonSubmit isSubmitting={formik.isSubmitting}>
          {t('form.submit')}
        </ButtonSubmit>
      </Stack>
    </FormikProvider>
  );
}
