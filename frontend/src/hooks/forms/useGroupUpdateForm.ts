import myToast from '../../utils/myToast.tsx';
import useGroupForm from './useGroupForm.ts';
import useFetchGroupQuery from '../query/useFetchGroupQuery.ts';
import { GroupFormValues } from '../../interfaces';
import useUpdateGroupMutation from '../mutation/useUpdateGroupMutation.ts';
import { useTranslation } from 'react-i18next';

const useGroupUpdateForm = (groupId: number) => {
  const fetchGroupQuery = useFetchGroupQuery(groupId);
  const updateGroupMutation = useUpdateGroupMutation(groupId);
  const { t } = useTranslation();

  const handleSubmit = async (values: GroupFormValues) => {
    try {
      await updateGroupMutation.mutateAsync(values);

      myToast({
        message: t('action.group.successGroupUpdate'),
        severity: 'success',
      });
    } catch (e) {
      myToast({
        message: t('action.group.failureGroupUpdate'),
        severity: 'error',
      });
    }
  };

  return useGroupForm(fetchGroupQuery.data!, handleSubmit);
};

export default useGroupUpdateForm;
