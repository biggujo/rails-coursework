import useUpdateProfileForm from '../../hooks/useUpdateProfileForm.ts';
import { FormikProvider } from 'formik';
import FormField from '../FormField/FormField.tsx';
import { Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import MyDropzone from '../MyDropzone/MyDropzone.tsx';
import { useTranslation } from 'react-i18next';

export default function ProfileUpdateForm() {
  const formik = useUpdateProfileForm();
  const { t } = useTranslation();

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
          {t('form.textData')}
        </Typography>
        <Stack direction={'row'} gap={8}>
          <Stack direction={'column'} gap={2}>
            <FormField
              name={'email'}
              label={`${t('form.email')} *`}
              formik={formik}
              disabled={formik.isSubmitting}
            />
            <FormField
              name={'nickname'}
              label={`${t('form.nickname')} *`}
              formik={formik}
              disabled={formik.isSubmitting}
            />
            <FormField
              name={'full_name'}
              label={`${t('form.fullName')} *`}
              formik={formik}
              disabled={formik.isSubmitting}
            />
          </Stack>
          <Stack direction={'column'} gap={2}>
            <FormField
              name={'country'}
              label={`${t('form.country')} *`}
              formik={formik}
              disabled={formik.isSubmitting}
            />
            <FormField
              name={'city'}
              label={`${t('form.city')} *`}
              formik={formik}
              disabled={formik.isSubmitting}
            />
          </Stack>
        </Stack>
        <Typography variant={'h6'} pb={2}>
          {t('form.newAvatar')}
        </Typography>
        <MyDropzone
          title={t('form.newAvatar')}
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
          {t('form.update')}
        </LoadingButton>
      </Stack>
    </FormikProvider>
  );
}
