import * as Yup from 'yup';
import { useFormik } from 'formik';
import API from '../utils/api.ts';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthUser } from '../redux/auth/selectors.ts';
import { ProfileUpdateFormAPI } from '../interfaces/ProfileUpdateFormAPI.ts';
import { AppDispatch } from '../redux/store.ts';
import ProfileOperations from '../redux/profile/operations.ts';
import myToast from '../utils/myToast.tsx';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required'),
  nickname: Yup.string().required('Nickname is required'),
});

export default function useUpdateProfileForm() {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector(selectAuthUser);

  const initialValues: ProfileUpdateFormAPI = {
    id: user.id,
    email: user.email,
    nickname: user.nickname,
  };

  return useFormik({
    validationSchema,
    initialValues,
    onSubmit: async values => {
      try {
        await API.user.updateById(values);
        await dispatch(ProfileOperations.fetchProfileData(values.id)).unwrap();

        myToast({
          message: 'Successful profile update',
          severity: 'success',
        });
      } catch {
        myToast({
          message: 'Update has failed. Try again later',
          severity: 'error',
        });
      }
    },
  });
}
