import useGroupCreateForm from '../../hooks/forms/useGroupCreateForm.ts';
import GroupForm from '../GroupForm';

export default function GroupCreateForm() {
  const formik = useGroupCreateForm();

  return <GroupForm formik={formik} />;
}
