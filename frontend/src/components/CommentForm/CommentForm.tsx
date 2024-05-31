import { FormikProps, FormikProvider } from 'formik';
import { Stack, TextField } from '@mui/material';
import ButtonSubmit from '../ButtonSubmit';
import { CommentFormValues } from '../../hooks/forms/useCommentForm.ts';

interface Props {
  formik: FormikProps<CommentFormValues>;
}

export default function CommentForm({ formik }: Props) {
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
          label={'Updated content'}
          type={'text'}
          {...formik.getFieldProps('text')}
          error={formik.touched.text && Boolean(formik.errors.text)}
          helperText={formik.touched.text && formik.errors.text}
          multiline={true}
          minRows={3}
          required
        />
        <ButtonSubmit isSubmitting={formik.isSubmitting}>Submit</ButtonSubmit>
      </Stack>
    </FormikProvider>
  );
}
