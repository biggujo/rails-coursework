import * as Yup from 'yup';
import { UserSignInFormAPI } from '../../interfaces';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
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
});

function useSignInForm() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues: UserSignInFormAPI = {
    email: '',
    password: '',
  };

  return useFormik({
    initialValues,
    validationSchema,
    onSubmit: async values => {
      try {
        await dispatch(AuthOperations.signIn(values)).unwrap();

        navigate('/');
        myToast({
          message: 'Successful sign in!',
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

export default useSignInForm;
