import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { selectAuthUser } from '../../redux/auth/selectors.ts';

const useGroupMembership = ({ id, apiFn }) => {
  const queryClient = useQueryClient();
  const currentUser = useSelector(selectAuthUser);

  const preparedApiFn =
    ({ groupId, userId }: { groupId: number; userId: number }) =>
    () =>
      apiFn({
        groupId,
        userId,
      });

  return useMutation({
    mutationKey: [`group_${id}`],
    mutationFn: preparedApiFn({
      groupId: id,
      userId: currentUser.id,
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`group_${id}`],
      });
    },
  });
};

export default useGroupMembership;
