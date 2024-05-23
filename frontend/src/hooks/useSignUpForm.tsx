import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import CustomAlert from '../components/CustomAlert';
import useSignUpMutation from './mutation/useSignUpMutation.ts';
import UserSignUpFormAPI from '../interfaces/UserSignUpFormAPI.ts';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password have to be more than 6 symbols')
    .required('Password is required'),
  nickname: Yup.string()
    .min(3, 'Nickname have to be more than 3 symbols')
    .required('Nickname is required'),
});

function useSignUpForm() {
  const navigate = useNavigate();
  const signUpMutation = useSignUpMutation();

  // Save Bearer on success
  useEffect(() => {
    if (signUpMutation.status !== 'success') {
      return;
    }

    navigate('/');
    toast.custom(
      <CustomAlert message={'Successful sign up!'} severity={'success'} />
    );
    // eslint-disable-next-line
  }, [signUpMutation.status]);

  const initialValues: UserSignUpFormAPI = {
    email: '',
    password: '',
    nickname: '',
  };

  return useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        await signUpMutation.mutateAsync(values);
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

export default useSignUpForm;
