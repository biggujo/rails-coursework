import { useQuery } from '@tanstack/react-query';
import API from '../../utils/api.ts';

const useFetchMyGroups = () =>
  useQuery({
    queryKey: ['groups'],
    queryFn: API.groups.fetchMyGroups,
    // @ts-expect-error of bad typing
    cacheTime: 120,
  });

export default useFetchMyGroups;
