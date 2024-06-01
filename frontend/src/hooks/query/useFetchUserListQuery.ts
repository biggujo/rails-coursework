import { useQuery } from '@tanstack/react-query';
import UserEntity from '../../interfaces/UserEntity.interface.ts';

const useFetchUserListQuery = (
  apiFn: () => Promise<Array<UserEntity>>,
  enabled: boolean
) => {
  return useQuery({
    queryKey: apiFn.toString(),
    queryFn: apiFn,
    enabled,
  });
};

export default useFetchUserListQuery;
