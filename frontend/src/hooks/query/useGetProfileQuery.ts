import { useQuery } from '@tanstack/react-query';
import API from '../../utils/api.ts';

function useGetProfileQuery() {
  return useQuery({
    queryKey: ['users/profile'],
    queryFn: API.profile.getProfile,
    // @ts-expect-error suppress missing property from type
    cacheTime: 0,
  });
}

export default useGetProfileQuery;