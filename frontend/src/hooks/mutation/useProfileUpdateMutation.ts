import { useMutation } from '@tanstack/react-query';
import API from '../../utils/api.ts';
import { useAuth } from '../../providers';

export default function useProfileUpdateMutation() {
  const { setUser } = useAuth();

  return useMutation({
    mutationKey: ['profile_update'],
    mutationFn: API.profile.updateProfile,
    onSuccess: (data) => {
      setUser(data);
    },
  });
}
