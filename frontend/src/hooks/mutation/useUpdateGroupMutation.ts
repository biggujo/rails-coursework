import { GroupFormValues } from '../../interfaces';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import API from '../../utils/api.ts';

const useUpdateGroupMutation = (groupId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [`group_${groupId}`],
    mutationFn: (data: GroupFormValues) =>
      API.groups.updateById({
        id: groupId,
        data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`group_${groupId}`],
      });
    },
  });
};

export default useUpdateGroupMutation;
