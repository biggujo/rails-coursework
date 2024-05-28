import { useMutation } from '@tanstack/react-query';
import API from '../../utils/api.ts';
import { PasswordRecoveryFormData } from '../../interfaces';

const usePasswordResetRecoveryMutation = () => {
  return useMutation({
    mutationKey: ['password_recovery'],
    mutationFn: (data: PasswordRecoveryFormData) =>
      API.passwordRecovery.reset(data),
  });
};

export default usePasswordResetRecoveryMutation;
