import { Stack, TextField } from '@mui/material';
import usePasswordRecoveryRequestForm from '../../hooks/forms/usePasswordRecoveryRequestForm.ts';
import { FormikProvider } from 'formik';
import ButtonSubmit from '../ButtonSubmit';

export default function PasswordRecoveryRequestForm() {
  const formik = usePasswordRecoveryRequestForm();

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
          label={'Email'}
          placeholder={'cage@acme.com'}
          {...formik.getFieldProps('email')}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          required
        />
        <ButtonSubmit isSubmitting={formik.isSubmitting}>
          Request Recovery
        </ButtonSubmit>
      </Stack>
    </FormikProvider>
  );
}
