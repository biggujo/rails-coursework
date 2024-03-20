import { useQuery } from '@tanstack/react-query';
import API from '../../utils/api.ts';

function usePingQuery() {
  return useQuery({
    queryKey: ['ping'],
    queryFn: API.debug.getPing,
  });
}

export default usePingQuery;
