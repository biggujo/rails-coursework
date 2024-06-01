import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import UserSignUpFormAPI from '../../interfaces/UserSignUpFormAPI.ts';
import { AppDispatch } from '../../redux/store.ts';
import { useDispatch } from 'react-redux';
import AuthOperations from '../../redux/auth/operations.ts';
import myToast from '../../utils/myToast.tsx';
import { fullProfileValidationSchema } from '../../validations';

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
    validationSchema: fullProfileValidationSchema(true),
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
            message: 'Such user already exists',
            severity: 'error',
          });
          return;
        }
      }
    },
  });
}

export default useSignUpForm;
