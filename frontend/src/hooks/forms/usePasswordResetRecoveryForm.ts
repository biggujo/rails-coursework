import { useFormik } from 'formik';
import * as Yup from 'yup';
import myToast from '../../utils/myToast.tsx';
import { AxiosError } from 'axios';
import { PasswordRecoveryFormData } from '../../interfaces';
import usePasswordResetRecoveryMutation from '../mutation/usePasswordResetRecoveryMutation.ts';
import { useNavigate } from 'react-router-dom';

const passwordValidation = Yup.string()
  .min(6, 'Password have to be more than 6 symbols')
  .required('Password is required');

const validationSchema = Yup.object({
  password: passwordValidation,
  confirmPassword: passwordValidation.equals(
    [Yup.ref('password')],
    'Passwords must match'
  ),
});

const initialValues: (
  confirmToken: string
) => PasswordRecoveryFormData = confirmToken => ({
  password: '',
  confirmPassword: '',
  reset_password_token: confirmToken,
});

const usePasswordResetRecoveryForm = ({
  confirmToken,
}: {
  confirmToken: string;
}) => {
  const navigate = useNavigate();
  const passwordRecoveryResetMutation = usePasswordResetRecoveryMutation();

  return useFormik({
    initialValues: initialValues(confirmToken),
    validationSchema,
    onSubmit: async (data: PasswordRecoveryFormData) => {
      console.log(data);

      try {
        const response = await passwordRecoveryResetMutation.mutateAsync(data);
        myToast({
          message: response.message,
          severity: 'success',
        });
        navigate('/sign-in');
      } catch (error) {
        myToast({
          message: (
            (error as AxiosError).response!.data as {
              status: { error: string };
            }
          ).status.error,
          severity: 'error',
        });
      }
    },
  });
};

export default usePasswordResetRecoveryForm;
