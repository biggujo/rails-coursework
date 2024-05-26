import { useQuery } from '@tanstack/react-query';
import API from '../../utils/api';

function useGetAllUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: API.user.getAll,
    // @ts-ignore
    cacheTime: 0,
  });
}

export default useGetAllUsers;
