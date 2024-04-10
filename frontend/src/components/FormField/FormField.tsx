import { TextField } from '@mui/material';
import { FormikProps } from 'formik';
import { ProfileUpdateFormAPI } from '../../interfaces/ProfileUpdateFormAPI.ts';

interface Props {
  name: keyof ProfileUpdateFormAPI;
  label: string;
  formik: FormikProps<ProfileUpdateFormAPI>;

  [props: string]: any;
}

export default function FormField({
                                    name,
                                    label,
                                    formik,
                                    ...props
                                  }: Props) {
  return (
    <TextField
      id={name}
      name={name}
      value={formik.values[name] as ProfileUpdateFormAPI[typeof name]}
      label={label}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={formik.touched[name] && Boolean(formik.errors[name])}
      helperText={formik.touched[name] && formik.errors[name]}
      {...props}
    />
  );
}
