import { useQuery } from '@tanstack/react-query';
import UserEntity from '../../interfaces/UserEntity.interface.ts';

const useFetchUserListQuery = (apiFn: () => Promise<Array<UserEntity>>) => {
  return useQuery({
    queryKey: apiFn.toString(),
    queryFn: apiFn,
    // @ts-expect-error of bad typing
    cacheTime: 0,
    enabled: false,
  });
};

export default useFetchUserListQuery;
