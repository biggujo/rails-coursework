import { useQuery } from '@tanstack/react-query';
import API from '../../utils/api.ts';

const useFetchGroupQuery = (id: number) =>
  useQuery({
    queryKey: [`group_${id}`],
    queryFn: API.groups.fetchById(id),
    // @ts-expect-error of bad typing
    cacheTime: 120,
  });

export default useFetchGroupQuery;
