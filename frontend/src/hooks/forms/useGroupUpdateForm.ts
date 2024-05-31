import myToast from '../../utils/myToast.tsx';
import useGroupForm from './useGroupForm.ts';
import useFetchGroupQuery from '../query/useFetchGroupQuery.ts';
import { GroupFormValues } from '../../interfaces';
import useUpdateGroupMutation from '../mutation/useUpdateGroupMutation.ts';

const useGroupUpdateForm = (groupId: number) => {
  const fetchGroupQuery = useFetchGroupQuery(groupId);
  const updateGroupMutation = useUpdateGroupMutation(groupId);

  const handleSubmit = async (values: GroupFormValues) => {
    try {
      await updateGroupMutation.mutateAsync(values);

      myToast({
        message: 'The group has been updated',
        severity: 'success',
      });
    } catch (e) {
      myToast({
        message: e as string,
        severity: 'error',
      });
    }
  };

  return useGroupForm(fetchGroupQuery.data!, handleSubmit);
};

export default useGroupUpdateForm;
