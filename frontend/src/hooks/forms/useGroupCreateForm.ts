import useCreateGroupMutation from '../mutation/useCreateGroupMutation.ts';
import useGroupForm from './useGroupForm.ts';
import { GroupFormValues } from '../../interfaces';
import myToast from '../../utils/myToast.tsx';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const useGroupCreateForm = () => {
  const navigate = useNavigate();
  const createGroupMutation = useCreateGroupMutation();
  const { t } = useTranslation();

  const handleSubmit = async (values: GroupFormValues) => {
    try {
      const createdGroup = await createGroupMutation.mutateAsync(values);

      myToast({
        message: t('action.group.successGroupCreate'),
        severity: 'success',
      });

      navigate(`/group/${createdGroup.id}`);
    } catch (e) {
      myToast({
        message: t('action.group.failureGroupCreate'),
        severity: 'error',
      });
    }
  };

  return useGroupForm(null, handleSubmit);
};

export default useGroupCreateForm;
