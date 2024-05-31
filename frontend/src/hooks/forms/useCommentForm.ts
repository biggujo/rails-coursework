import * as Yup from 'yup';
import { CommentEntity, Nullable } from '../../interfaces';
import { useFormik } from 'formik';

const validationSchema = Yup.object({
  text: Yup.string().required('Text is required'),
});

export interface CommentFormValues {
  text: string;
}

const initialValues: CommentFormValues = {
  text: '',
};

const useCommentForm = (
  givenValues: Nullable<CommentEntity>,
  onSubmit: (values: CommentFormValues) => void
) => {
  return useFormik({
    initialValues:
      (givenValues && {
        text: givenValues.text,
      }) ||
      initialValues,
    validationSchema,
    onSubmit: async values => {
      onSubmit(values);
    },
  });
};

export default useCommentForm;
