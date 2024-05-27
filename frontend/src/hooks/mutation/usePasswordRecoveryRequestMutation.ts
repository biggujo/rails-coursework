import { useMutation } from '@tanstack/react-query';
import API from '../../utils/api.ts';

const usePasswordRecoveryRequestMutation = () => {
  return useMutation({
    mutationKey: ['password_recovery'],
    mutationFn: (email: string) => API.passwordRecovery.request(email),
  });
};

export default usePasswordRecoveryRequestMutation;
