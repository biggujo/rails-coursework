import * as Yup from 'yup';
import { useFormik } from 'formik';
import { PostEntity } from '../../interfaces';

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  content: Yup.string().min(3).required('Content is required'),
});

interface FormValuesType {
  title: string;
  content: string;
}

const initialValues = {
  title: '',
  content: '',
};

const usePostForm = (
  givenValues: PostEntity,
  onSubmit: (values: FormValuesType) => void
) => {
  return useFormik({
    initialValues:
      {
        title: givenValues.title,
        content: givenValues.content,
      } || initialValues,
    validationSchema,
    onSubmit: async values => {
      onSubmit(values);
    },
  });
};

export default usePostForm;
