import * as Yup from 'yup';
import { GroupEntity, GroupFormValues, Nullable } from '../../interfaces';
import { useFormik } from 'formik';

const validationSchema = Yup.object({
  name: Yup.string().min(3).max(50).required('Name is required'),
  description: Yup.string().min(3).max(100).required('Description is required'),
});

const initialValues: GroupFormValues = {
  name: '',
  description: '',
  profile_photo: null,
};

const useGroupForm = (
  givenValues: Nullable<GroupEntity>,
  onSubmit: (values: Omit<GroupFormValues, 'profile_photo'>) => void
) => {
  return useFormik({
    initialValues:
      (givenValues && {
        name: givenValues.name,
        description: givenValues.description,
      }) ||
      initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      await onSubmit(values);
      resetForm();
    },
  });
};

export default useGroupForm;
