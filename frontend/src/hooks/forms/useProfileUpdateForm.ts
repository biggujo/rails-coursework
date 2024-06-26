import { useFormik } from 'formik';
import API from '../../utils/api.ts';
import { useDispatch, useSelector } from 'react-redux';
import { ProfileUpdateFormAPI } from '../../interfaces/ProfileUpdateFormAPI.ts';
import { AppDispatch } from '../../redux/store.ts';
import ProfileOperations from '../../redux/profile/operations.ts';
import myToast from '../../utils/myToast.tsx';
import { fullProfileValidationSchema } from '../../validations';
import { selectProfileData } from '../../redux/profile/selectors.ts';

export default function useProfileUpdateForm() {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector(selectProfileData);

  const initialValues: ProfileUpdateFormAPI = {
    id: user.id,
    email: user.email,
    nickname: user.nickname,
    country: user.country,
    city: user.city,
    full_name: user.full_name,
    profile_photo: null,
  };

  return useFormik({
    validationSchema: fullProfileValidationSchema(false),
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
