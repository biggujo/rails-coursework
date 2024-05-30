import useCreateGroupMutation from '../mutation/useCreateGroupMutation.ts';
import useGroupForm from './useGroupForm.ts';
import { GroupFormValues } from '../../interfaces';
import myToast from '../../utils/myToast.tsx';
import { useNavigate } from 'react-router-dom';

const useGroupCreateForm = () => {
  const navigate = useNavigate();
  const createGroupMutation = useCreateGroupMutation();

  const handleSubmit = async (values: GroupFormValues) => {
    try {
      const createdGroup = await createGroupMutation.mutateAsync(values);

      myToast({
        message: 'The group has been created',
        severity: 'success',
      });

      navigate(`/group/${createdGroup.id}`);
    } catch (e) {
      myToast({
        message: e as string,
        severity: 'error',
      });
    }
  };

  return useGroupForm(null, handleSubmit);
};

export default useGroupCreateForm;
