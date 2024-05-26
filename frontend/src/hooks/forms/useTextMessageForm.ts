import * as Yup from 'yup';
import { useFormik } from 'formik';

const validationSchema = Yup.object({
  message: Yup.string().trim().required(),
});

const useTextMessageForm = (onSubmit: (message: string) => void) => {
  const initialValues: {
    message: string;
  } = {
    message: '',
  };

  return useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      onSubmit(values.message);

      resetForm();
    },
  });
};
export default useTextMessageForm;
