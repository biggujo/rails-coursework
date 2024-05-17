import { useQuery } from '@tanstack/react-query';
import API from '../../utils/api.ts';
import useToken from '../useToken.ts';
import { useEffect } from 'react';
import { useAuth } from '../../providers';
import CustomAlert from '../../components/CustomAlert';
import toast from 'react-hot-toast';

// Is used to retrieve the latest data from the backend about user
export default function useRefreshUser() {
  const [token, setToken] = useToken();
  const { setUser, setIsLoggedIn, setIsRefreshing } = useAuth();

  const query = useQuery({
    queryKey: ['refresh'],
    queryFn: API.profile.refreshUser,
    enabled: token !== null && token.length > 0,
  });

  useEffect(() => {
    if (query.isSuccess) {
      setUser(query.data);
      setIsRefreshing(false);
      setIsLoggedIn(true);
      return;
    }

    if (query.isError) {
      toast.custom(
        <CustomAlert
          severity={'warning'}
          message={'Session has expired. Sign in again'}
        />
      );
      setUser(null);
      setToken('');
    }
  }, [query, setIsLoggedIn, setIsRefreshing, setToken, setUser]);

  return query;
}
