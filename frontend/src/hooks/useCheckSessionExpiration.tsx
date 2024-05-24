import { useEffect } from 'react';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import CustomAlert from '../components/CustomAlert';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthIsLoggedIn } from '../redux/auth/selectors.ts';
import { AppDispatch } from '../redux/store.ts';
import { resetAuthData } from '../redux/auth/slice.ts';

function useCheckSessionExpiration(error: object | null) {
  const dispatch: AppDispatch = useDispatch();
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);
  const navigate = useNavigate();

  // Clear profile data on session expiration
  // Go to sign in
  useEffect(() => {
    if (error === null) {
      return;
    }

    if (isLoggedIn && (error as AxiosError).response!.status === 401) {
      dispatch(resetAuthData());
      toast.custom(
        <CustomAlert
          severity={'warning'}
          message={'Session has expired. Sign in again'}
        />
      );
      navigate('/sign-in');
    }
  }, [isLoggedIn, error]);
}

export default useCheckSessionExpiration;
