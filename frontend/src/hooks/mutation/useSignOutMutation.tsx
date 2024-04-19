import { useMutation } from '@tanstack/react-query';
import API from '../../utils/api.ts';
import { useAuth } from '../../providers';
import useToken from '../useToken.ts';
import toast from 'react-hot-toast';
import CustomAlert from '../../components/CustomAlert/index.ts';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

function useSignOutMutation() {
  const navigate = useNavigate();
  const { setIsLoggedIn, setUser } = useAuth();
  const [, setToken] = useToken();

  return useMutation({
    mutationKey: ['sign_out'],
    mutationFn: API.auth.signOut,
    onSuccess: () => {
      setUser({});
      setIsLoggedIn(false);
      setToken('');

      toast.custom(
        <CustomAlert message={'Successful sign out'} severity={'success'} />
      );
    },
    onError: (error) => {
      if ((error as AxiosError).response!.status === 401) {
        navigate('/');
      }
    },
  });
}

export default useSignOutMutation;
