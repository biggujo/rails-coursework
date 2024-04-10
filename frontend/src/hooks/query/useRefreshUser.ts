import { useQuery } from '@tanstack/react-query';
import API from '../../utils/api.ts';
import useToken from '../useToken.ts';
import { useEffect } from 'react';
import { useAuth } from '../../providers';

// Is used to retrieve the latest data from the backend about user
export default function useRefreshUser() {
  const [token] = useToken();
  const { setUser } = useAuth();

  const query = useQuery({
    queryKey: ['refresh'],
    queryFn: API.profile.refreshUser,
    enabled: token !== null,
  });

  useEffect(() => {
    if (query.isSuccess) {
      setUser(query.data);
    }
  }, [query, setUser]);

  return query;
}
