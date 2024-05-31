import useUpdateProfileForm from '../../hooks/useUpdateProfileForm.ts';
import { FormikProvider } from 'formik';
import FormField from '../FormField/FormField.tsx';
import { Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import MyDropzone from '../MyDropzone/MyDropzone.tsx';

export default function ProfileUpdateForm() {
  const formik = useUpdateProfileForm();

  return (
    <FormikProvider value={formik}>
      <Stack
        component={'form'}
        alignItems={'start'}
        direction={'column'}
        onSubmit={event => {
          event.preventDefault();
          formik.handleSubmit();
        }}
        gap={2}
      >
        <Typography variant={'h6'} pb={2}>
          Text data
        </Typography>
        <Stack direction={'row'} gap={8}>
          <Stack direction={'column'} gap={2}>
            <FormField
              name={'email'}
              label={'New email *'}
              formik={formik}
              disabled={formik.isSubmitting}
            />
            <FormField
              name={'nickname'}
              label={'New nickname *'}
              formik={formik}
              disabled={formik.isSubmitting}
            />
            <FormField
              name={'full_name'}
              label={'New full name *'}
              formik={formik}
              disabled={formik.isSubmitting}
            />
          </Stack>
          <Stack direction={'column'} gap={2}>
            <FormField
              name={'country'}
              label={'New country *'}
              formik={formik}
              disabled={formik.isSubmitting}
            />
            <FormField
              name={'city'}
              label={'New city *'}
              formik={formik}
              disabled={formik.isSubmitting}
            />
          </Stack>
        </Stack>
        <Typography variant={'h6'} pb={2}>
          New Avatar
        </Typography>
        <MyDropzone
          title={'New avatar'}
          onAddFile={([file]) => {
            formik.setFieldValue('profile_photo', file);
          }}
          maxFiles={1}
        />
        <LoadingButton
          type={'submit'}
          loading={formik.isSubmitting}
          variant={'contained'}
        >
          Update
        </LoadingButton>
      </Stack>
    </FormikProvider>
  );
}
