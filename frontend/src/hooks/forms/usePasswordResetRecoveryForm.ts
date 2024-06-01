import { useFormik } from 'formik';
import * as Yup from 'yup';
import myToast from '../../utils/myToast.tsx';
import { PasswordRecoveryFormData } from '../../interfaces';
import usePasswordResetRecoveryMutation from '../mutation/usePasswordResetRecoveryMutation.ts';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  return useFormik({
    initialValues: initialValues(confirmToken),
    validationSchema,
    onSubmit: async (data: PasswordRecoveryFormData) => {
      try {
        await passwordRecoveryResetMutation.mutateAsync(data);
        myToast({
          message: t('action.passwordRecovery.successChange'),
          severity: 'success',
        });
        navigate('/sign-in');
      } catch (error) {
        myToast({
          message: t('action.passwordRecovery.failureChange'),
          severity: 'error',
        });
      }
    },
  });
};

export default usePasswordResetRecoveryForm;
