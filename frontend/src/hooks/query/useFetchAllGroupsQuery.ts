import { useQuery } from '@tanstack/react-query';
import API from '../../utils/api.ts';

const useFetchAllGroupsQuery = () =>
  useQuery({
    queryKey: [`groups`],
    queryFn: API.groups.fetchAll,
  });

export default useFetchAllGroupsQuery;
