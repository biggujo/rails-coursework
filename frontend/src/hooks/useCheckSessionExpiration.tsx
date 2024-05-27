import { useEffect } from 'react';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthIsLoggedIn } from '../redux/auth/selectors.ts';
import { AppDispatch } from '../redux/store.ts';
import { resetAuthData } from '../redux/auth/slice.ts';
import myToast from '../utils/myToast.tsx';

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
      myToast({
        message: 'Session has expired. Sign in again',
        severity: 'warning',
      });
      navigate('/sign-in');
    }
  }, [isLoggedIn, error, dispatch, navigate]);
}

export default useCheckSessionExpiration;
