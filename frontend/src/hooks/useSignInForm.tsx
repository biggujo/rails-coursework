import * as Yup from 'yup';
import { UserSignInFormAPI } from '../interfaces';
import { useFormik } from 'formik';
import useSignInMutation from './mutation/useSignInMutation.ts';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import CustomAlert from '../components/CustomAlert';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password have to be more than 6 symbols')
    .required('Password is required'),
});

function useSignInForm() {
  const navigate = useNavigate();
  const signInMutation = useSignInMutation();

  // Save Bearer on success
  useEffect(() => {
    if (signInMutation.status !== 'success') {
      return;
    }

    navigate('/');
    toast.custom(
      <CustomAlert message={'Successful sign in!'} severity={'success'} />
    );
    // eslint-disable-next-line
  }, [signInMutation.status]);

  const initialValues: UserSignInFormAPI = {
    email: '',
    password: '',
  };

  return useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        await signInMutation.mutateAsync(values);
      } catch (e: unknown) {
        if (e instanceof AxiosError) {
          toast.custom(
            <CustomAlert message={e.response!.data} severity={'error'} />
          );
          return;
        }
      }
    },
  });
}

export default useSignInForm;
