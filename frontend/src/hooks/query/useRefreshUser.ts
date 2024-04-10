import { useQuery } from '@tanstack/react-query';
import API from '../../utils/api.ts';
import useToken from '../useToken.ts';
import { useEffect } from 'react';
import { useAuth } from '../../providers';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

// Is used to retrieve the latest data from the backend about user
export default function useRefreshUser() {
  const [token, setToken] = useToken();
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const query = useQuery({
    queryKey: ['refresh'],
    queryFn: API.profile.refreshUser,
    enabled: token !== null && token.length > 0,
  });

  useEffect(() => {
    if (query.isSuccess) {
      setUser(query.data);
      return;
    }

    if (query.isError) {
      toast.error('Your session has expired. Sign in again');

      setToken('');
      navigate('/sign-in');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.isFetching]);

  return query;
}
