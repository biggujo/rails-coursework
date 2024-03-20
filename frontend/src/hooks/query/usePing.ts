import { useQuery } from '@tanstack/react-query';
import API from '../../utils/api.ts';

function UsePing() {
  return useQuery({
    queryKey: ['ping'],
    queryFn: API.getPing,
  });
}

export default UsePing;
