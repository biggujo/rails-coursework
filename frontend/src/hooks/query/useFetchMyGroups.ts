import { useQuery } from '@tanstack/react-query';
import API from '../../utils/api.ts';

const useFetchMyGroups = () =>
  useQuery({
    queryKey: ['groups'],
    queryFn: API.groups.fetchMyGroups,
  });

export default useFetchMyGroups;
