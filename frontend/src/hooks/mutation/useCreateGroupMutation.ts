import API from '../../utils/api.ts';
import { useMutation } from '@tanstack/react-query';
import { GroupFormValues } from '../../interfaces';

const useCreateGroupMutation = () => {
  return useMutation({
    mutationKey: [`new_group`],
    mutationFn: (data: GroupFormValues) => API.groups.create(data),
  });
};

export default useCreateGroupMutation;
