import * as Yup from 'yup';

const validationSchema = (isPasswordRequired: boolean) =>
  Yup.object({
    email: Yup.string()
      .email('Enter a valid email')
      .required('Email is required'),
    password: isPasswordRequired
      ? Yup.string()
          .min(6, 'Password have to be more than 6 symbols')
          .required('Password is required')
      : Yup.string(),
    nickname: Yup.string()
      .min(3, 'Nickname have to be more than 3 symbols')
      .required('Nickname is required'),
    country: Yup.string().min(3).required('Country is required'),
    city: Yup.string().required('City is required'),
    full_name: Yup.string().required('Full name is required'),
  });

export default validationSchema;
