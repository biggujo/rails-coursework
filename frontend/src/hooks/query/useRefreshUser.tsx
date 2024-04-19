import { useQuery } from '@tanstack/react-query';
import API from '../../utils/api.ts';
import useToken from '../useToken.ts';
import { useEffect } from 'react';
import { useAuth } from '../../providers';
import toast from 'react-hot-toast';
import CustomAlert from '../../components/CustomAlert';

// Is used to retrieve the latest data from the backend about user
export default function useRefreshUser() {
  const [token, setToken] = useToken();
  const { setUser } = useAuth();

  const query = useQuery({
    queryKey: ['refresh'],
    queryFn: API.profile.refreshUser,
    enabled: token !== null && token.length > 0,
  });

  useEffect(() => {
    if (query.isSuccess) {
      setUser(query.data);
    }

    if (query.isError) {
      toast.custom(<CustomAlert
        severity={'warning'}
        message={'Session has expired. Sign in again'} />);
      setUser(null);
      setToken('');
    }
  }, [query, setToken, setUser]);

  return query;
}
