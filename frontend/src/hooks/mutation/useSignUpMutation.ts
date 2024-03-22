import { useAuth } from '../../providers';
import useToken from '../useToken.ts';
import { useMutation } from '@tanstack/react-query';
import API from '../../utils/api.ts';

function useSignUpMutation() {
  const { setIsLoggedIn, setUser } = useAuth();
  const [, setToken] = useToken();

  return useMutation({
    mutationKey: ['sign_up'],
    mutationFn: API.auth.signUp,
    onSuccess: (data) => {
      setUser(data!.data.data);
      setIsLoggedIn(true);
      setToken(data!.headers.authorization);
    },
  });
}

export default useSignUpMutation;
