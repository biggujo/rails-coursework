import * as Yup from 'yup';
import { useFormik } from 'formik';
import usePasswordRecoveryRequestMutation from '../mutation/usePasswordRecoveryRequestMutation.ts';
import myToast from '../../utils/myToast.tsx';
import { AxiosError } from 'axios';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required'),
});

const initialValues = {
  email: '',
};

const usePasswordRecoveryRequestForm = () => {
  const passwordRecoveryReqMutation = usePasswordRecoveryRequestMutation();

  return useFormik({
    initialValues,
    validationSchema,
    onSubmit: async ({ email }) => {
      try {
        const response = await passwordRecoveryReqMutation.mutateAsync(email);
        myToast({
          message: response.message,
          severity: 'info',
        });
      } catch (error) {
        myToast({
          message: ((error as AxiosError).response!.data as { error: string })
            .error,
          severity: 'error',
        });
      }
    },
  });
};

export default usePasswordRecoveryRequestForm;
