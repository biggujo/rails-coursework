import { useMutation } from '@tanstack/react-query';
import API from '../../utils/api.ts';

const useDeleteGroupMutation = (id: number) => {
  const preparedApiFn = (id: number) => API.groups.deleteById(id);

  return useMutation({
    mutationKey: [`group_${id}`],
    mutationFn: preparedApiFn(id),
  });
};

export default useDeleteGroupMutation;
