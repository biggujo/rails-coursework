import useUpdateProfileForm from '../../hooks/useUpdateProfileForm.ts';
import { FormikProvider } from 'formik';
import FormField from '../FormField/FormField.tsx';
import { Box, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useSelector } from 'react-redux';
import { selectProfileData } from '../../redux/profile/selectors.ts';
import MyDropzone from '../MyDropzone/MyDropzone.tsx';
import { ProfileMainData } from '../../pages/ProfilePage.tsx';

export default function ProfileUpdateForm() {
  const formik = useUpdateProfileForm();
  const profileData = useSelector(selectProfileData);

  return (
    <FormikProvider value={formik}>
      <Stack gap={4} direction={'row'}>
        <Box width={'320px'}>
          <Typography variant={'h6'} pb={2}>
            Original information
          </Typography>
          <ProfileMainData userData={profileData} />
        </Box>
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
            Updated information
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
          <MyDropzone
            title={'New avatar'}
            onAddFile={([file]) => {
              formik.setFieldValue('profile_photo', file);
            }}
          />
          <LoadingButton
            type={'submit'}
            loading={formik.isSubmitting}
            variant={'contained'}
          >
            Update
          </LoadingButton>
        </Stack>
      </Stack>
    </FormikProvider>
  );
}
