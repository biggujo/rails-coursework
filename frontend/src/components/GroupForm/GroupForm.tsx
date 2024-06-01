import { FormikProps, FormikProvider } from 'formik';
import { Box, Stack, TextField, Typography } from '@mui/material';
import ButtonSubmit from '../ButtonSubmit';
import { GroupFormValues } from '../../interfaces';
import MyDropzone from '../MyDropzone/MyDropzone.tsx';
import { useTranslation } from 'react-i18next';

interface Props {
  formik: FormikProps<GroupFormValues>;
}

export default function GroupForm({ formik }: Props) {
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
        <Stack gap={2}>
          <Typography variant={'h6'}>Text data</Typography>
          <TextField
            label={t('form.name')}
            type={'text'}
            {...formik.getFieldProps('name')}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            required
          />
          <TextField
            label={t('form.description')}
            type={'text'}
            {...formik.getFieldProps('description')}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
            multiline={true}
            minRows={3}
            required
          />
        </Stack>
        <Box>
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
        </Box>
        <Box alignSelf={'flex-start'}>
          <ButtonSubmit isSubmitting={formik.isSubmitting}>
            {t('form.submit')}
          </ButtonSubmit>
        </Box>
      </Stack>
    </FormikProvider>
  );
}
