import { useMutation } from '@tanstack/react-query';
import API from '../../utils/api.ts';
import { useAuth } from '../../providers';
import useToken from '../useToken.ts';

function useSignOutMutation() {
  const { setIsLoggedIn, setUser } = useAuth();
  const [, setToken] = useToken();

  return useMutation({
    mutationKey: ['sign_out'],
    mutationFn: API.auth.signOut,
    onSuccess: () => {
      setUser({});
      setIsLoggedIn(false);
      setToken('');
    },
  });
}

export default useSignOutMutation;
