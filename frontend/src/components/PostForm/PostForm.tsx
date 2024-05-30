import { Stack, TextField } from '@mui/material';
import { FormikProps, FormikProvider } from 'formik';
import ButtonSubmit from '../ButtonSubmit';
import { PostFormValues } from '../../hooks/forms/usePostForm.ts';

interface Props {
  formik: FormikProps<PostFormValues>;
}

export default function PostForm({ formik }: Props) {
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
          label={'Updated title'}
          type={'text'}
          {...formik.getFieldProps('title')}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
          required
        />
        <TextField
          label={'Updated content'}
          type={'text'}
          {...formik.getFieldProps('content')}
          error={formik.touched.content && Boolean(formik.errors.content)}
          helperText={formik.touched.content && formik.errors.content}
          multiline={true}
          minRows={5}
          required
        />
        <ButtonSubmit isSubmitting={formik.isSubmitting}>Submit</ButtonSubmit>
      </Stack>
    </FormikProvider>
  );
}
