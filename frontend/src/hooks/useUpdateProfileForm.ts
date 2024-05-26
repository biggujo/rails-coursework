import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useAuth } from '../providers';
import API from '../utils/api.ts';
import { AxiosError, AxiosResponse } from 'axios';
import { ProfileUpdateFormAPI } from '../interfaces/ProfileUpdateFormAPI.ts';
import { User } from '../interfaces';
import useGetProfileQuery from './query/useGetProfileQuery.ts';
import toast from 'react-hot-toast';

const validationSchema = Yup.object({
  email: Yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  nickname: Yup
    .string()
    .required('Nickname is required'),
});

export default function useUpdateProfileForm() {
  const { user, setUser } = useAuth();
  const getProfileQuery = useGetProfileQuery({ enabled: false });

  const initialValues = {
    email: user.email,
    nickname: user.nickname,
  };

  return useFormik({
    validationSchema,
    initialValues,
    onSubmit: async (values) => {
      try {
        const user: User = await API.profile.updateProfile(values);

        setUser(user);

        await getProfileQuery.refetch();

        toast.success('Successful profile update');
      } catch {
        toast.error('Update has failed. Try again later');
      }
    },
  });
}
