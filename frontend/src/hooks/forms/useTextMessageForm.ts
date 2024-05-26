import * as Yup from 'yup';
import { useFormik } from 'formik';

const MAX_MESSAGE_LENGTH = 500;

const validationSchema = Yup.object({
  message: Yup.string().trim().max(MAX_MESSAGE_LENGTH).required(),
});

const useTextMessageForm = (onSubmit: (message: string) => void) => {
  const initialValues: {
    message: string;
  } = {
    message: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: true,
    onSubmit: (values, { resetForm }) => {
      onSubmit(values.message);

      resetForm();
    },
  });

  return [formik, MAX_MESSAGE_LENGTH];
};
export default useTextMessageForm;
