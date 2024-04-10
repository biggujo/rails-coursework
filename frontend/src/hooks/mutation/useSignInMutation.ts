import { useMutation } from '@tanstack/react-query';
import API from '../../utils/api.ts';
import { useAuth } from '../../providers';
import useToken from '../useToken.ts';

function useSignInMutation() {
  const { setIsLoggedIn, setUser } = useAuth();
  const [, setToken] = useToken();

  return useMutation({
    mutationKey: ['sign_in'],
    mutationFn: API.auth.signIn,
    onSuccess: (data) => {
      setUser(data!.data.data);
      setIsLoggedIn(true);
      setToken(data!.headers.authorization);
    },
  });
}

export default useSignInMutation;
