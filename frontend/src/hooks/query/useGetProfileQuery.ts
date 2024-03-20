import { useQuery } from '@tanstack/react-query';
import API from '../../utils/api.ts';

function useGetProfileQuery({ ...args }) {
  return useQuery({
    queryKey: ['users/profile'],
    queryFn: API.profile.getProfile,
    ...args,
  });
}

export default useGetProfileQuery;
