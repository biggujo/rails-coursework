import { useQuery } from '@tanstack/react-query';
import API from '../../utils/api.ts';

function useGetProfileQuery() {
  return useQuery({
    queryKey: ['users/profile'],
    queryFn: API.profile.getProfile,
    retry: 0,
    // @ts-ignore
    cacheTime: 0,
  });
}

export default useGetProfileQuery;
