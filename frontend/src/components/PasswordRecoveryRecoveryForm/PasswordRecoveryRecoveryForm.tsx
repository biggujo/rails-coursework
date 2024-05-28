import { FormikProvider } from 'formik';
import usePasswordResetRecoveryForm from '../../hooks/forms/usePasswordResetRecoveryForm.ts';
import { Stack, TextField } from '@mui/material';
import ButtonSubmit from '../ButtonSubmit';

interface Props {
  confirmToken: string;
}

export default function PasswordRecoveryRecoveryForm({ confirmToken }: Props) {
  const formik = usePasswordResetRecoveryForm({
    confirmToken,
  });

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
          label={'New password'}
          type={'password'}
          {...formik.getFieldProps('password')}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          required
        />
        <TextField
          label={'Confirm new password'}
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
        <ButtonSubmit isSubmitting={formik.isSubmitting}>Submit</ButtonSubmit>
      </Stack>
    </FormikProvider>
  );
}
