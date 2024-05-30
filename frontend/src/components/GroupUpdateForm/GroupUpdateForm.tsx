import useGroupUpdateForm from '../../hooks/forms/useGroupUpdateForm.ts';
import GroupForm from '../GroupForm';

interface Props {
  groupId: number;
}

export default function GroupUpdateForm({ groupId }: Props) {
  const formik = useGroupUpdateForm(groupId);

  return <GroupForm formik={formik} />;
}
