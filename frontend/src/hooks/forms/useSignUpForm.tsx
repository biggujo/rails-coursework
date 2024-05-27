import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import UserSignUpFormAPI from '../../interfaces/UserSignUpFormAPI.ts';
import { AppDispatch } from '../../redux/store.ts';
import { useDispatch } from 'react-redux';
import AuthOperations from '../../redux/auth/operations.ts';
import myToast from '../../utils/myToast.tsx';

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
  country: Yup.string().min(3).required('Country is required'),
  city: Yup.string().required('City is required'),
  full_name: Yup.string().required('Full name is required'),
});

function useSignUpForm() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues: UserSignUpFormAPI = {
    email: '',
    password: '',
    nickname: '',
    country: '',
    city: '',
    full_name: '',
  };

  return useFormik({
    initialValues,
    validationSchema,
    onSubmit: async values => {
      try {
        await dispatch(AuthOperations.signUp(values)).unwrap();

        navigate('/');
        myToast({
          message: 'Successful sign up!',
          severity: 'success',
        });
      } catch (e: unknown) {
        if (e instanceof AxiosError) {
          myToast({
            message: e.response!.data,
            severity: 'error',
          });
          return;
        }
      }
    },
  });
}

export default useSignUpForm;
