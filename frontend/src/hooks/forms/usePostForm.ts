import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Nullable, PostEntity } from '../../interfaces';

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  content: Yup.string().min(3).required('Content is required'),
});

export interface PostFormValues {
  title: string;
  content: string;
  photos: Array<File>;
}

const initialValues = {
  title: '',
  content: '',
  photos: [],
};

const usePostForm = (
  givenValues: Nullable<PostEntity>,
  onSubmit: (values: Omit<PostFormValues, 'photos'>) => void
) => {
  return useFormik({
    initialValues:
      (givenValues && {
        title: givenValues.title,
        content: givenValues.content,
      }) ||
      initialValues,
    validationSchema,
    onSubmit: async values => {
      onSubmit(values);
    },
  });
};

export default usePostForm;
