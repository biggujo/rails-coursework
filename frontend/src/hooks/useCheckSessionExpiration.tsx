import { useEffect } from 'react';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import CustomAlert from '../components/CustomAlert';
import { useAuth } from '../providers';
import useToken from './useToken.ts';
import { useNavigate } from 'react-router-dom';

function useCheckSessionExpiration(error: object | null) {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [, setToken] = useToken();

  // Clear auth data on session expiration
  // Go to sign in
  useEffect(() => {
    if (error === null) {
      return;
    }

    if (isLoggedIn && (error as AxiosError).response!.status === 401) {
      setIsLoggedIn(false);
      setToken('');
      toast.custom(<CustomAlert
        severity={'warning'}
        message={'Session has expired. Sign in again'} />);
      navigate('/sign-in');
    }
  }, [isLoggedIn, error, setIsLoggedIn, setToken, navigate]);
}

export default useCheckSessionExpiration;
