import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthIsLoggedIn } from '../../redux/auth/selectors.ts';
import { AppDispatch } from '../../redux/store.ts';
import AuthOperations from '../../redux/auth/operations.ts';

// Is used to retrieve the latest data from the backend about user
export default function useRefreshUser(isTokenLoading: boolean) {
  const dispatch: AppDispatch = useDispatch();
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);

  useEffect(() => {
    if (isTokenLoading || !isLoggedIn) {
      return;
    }

    dispatch(AuthOperations.refreshUser());
  }, [dispatch, isLoggedIn, isTokenLoading]);
}
