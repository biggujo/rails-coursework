import { useMutation } from '@tanstack/react-query';
import API from '../../utils/api.ts';

function useSignInMutation() {
  return useMutation({
    mutationKey: ['sign_in'],
    mutationFn: API.auth.signIn,
  });
}

export default useSignInMutation;
