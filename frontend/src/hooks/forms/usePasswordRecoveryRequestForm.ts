import * as Yup from 'yup';
import { useFormik } from 'formik';
import usePasswordRecoveryRequestMutation from '../mutation/usePasswordRecoveryRequestMutation.ts';
import myToast from '../../utils/myToast.tsx';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  return useFormik({
    initialValues,
    validationSchema,
    onSubmit: async ({ email }) => {
      try {
        await passwordRecoveryReqMutation.mutateAsync(email);
        myToast({
          message: t('action.passwordRecovery.successRequestCreate'),
          severity: 'info',
        });
      } catch (error) {
        myToast({
          message: t('action.passwordRecovery.failureRequestCreate'),
          severity: 'error',
        });
      }
    },
  });
};

export default usePasswordRecoveryRequestForm;
