import { useQuery } from '@tanstack/react-query';
import API from '../../utils/api.ts';

const useFetchGroupQuery = (id: number) =>
  useQuery({
    queryKey: [`group_${id}`],
    queryFn: API.groups.fetchById(id),
  });

export default useFetchGroupQuery;
