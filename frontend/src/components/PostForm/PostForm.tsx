import { Box, Stack, TextField, Typography } from '@mui/material';
import { FormikProps, FormikProvider } from 'formik';
import ButtonSubmit from '../ButtonSubmit';
import { PostFormValues } from '../../hooks/forms/usePostForm.ts';
import MyDropzone from '../MyDropzone/MyDropzone.tsx';
import { useTranslation } from 'react-i18next';

interface Props {
  formik: FormikProps<PostFormValues>;
}

const MAX_PHOTOS_SIZE = 4;

export default function PostForm({ formik }: Props) {
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
          label={t('form.title')}
          type={'text'}
          {...formik.getFieldProps('title')}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
          required
        />
        <TextField
          label={t('form.content')}
          type={'text'}
          {...formik.getFieldProps('content')}
          error={formik.touched.content && Boolean(formik.errors.content)}
          helperText={formik.touched.content && formik.errors.content}
          multiline={true}
          minRows={5}
          required
        />
        <Box>
          <Typography variant={'h6'} pb={2}>
            {t('form.newPhotos')}
          </Typography>
          <MyDropzone
            title={t('form.newPhotosWithLimit', { maxAmount: MAX_PHOTOS_SIZE })}
            onAddFile={files => {
              formik.setFieldValue('photos', files);
            }}
            maxFiles={MAX_PHOTOS_SIZE}
          />
        </Box>
        <ButtonSubmit isSubmitting={formik.isSubmitting}>
          {t('form.submit')}
        </ButtonSubmit>
      </Stack>
    </FormikProvider>
  );
}
