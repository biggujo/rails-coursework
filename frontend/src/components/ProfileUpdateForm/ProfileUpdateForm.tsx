import useUpdateProfileForm from '../../hooks/useUpdateProfileForm.ts';
import { FormikProvider } from 'formik';
import FormField from '../FormField/FormField.tsx';
import { Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';

export default function ProfileUpdateForm() {
  const formik = useUpdateProfileForm();

  return <FormikProvider value={formik}>
    <Stack component={'form'}
           alignItems={'start'}
           direction={'column'}
           onSubmit={(event) => {
             event.preventDefault();
             formik.handleSubmit();
           }}
           gap={2}>
      <FormField name={'email'}
                 label={'New email *'}
                 formik={formik}
                 disabled={formik.isSubmitting} />
      <FormField name={'nickname'}
                 label={'New nickname *'}
                 formik={formik}
                 disabled={formik.isSubmitting} />
      <LoadingButton
        type={'submit'}
        loading={formik.isSubmitting}
        variant={'contained'}>
        Update
      </LoadingButton>
    </Stack>
  </FormikProvider>;
}
