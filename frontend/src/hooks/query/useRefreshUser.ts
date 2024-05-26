import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth } from '../../redux/auth/selectors.ts';
import { AppDispatch } from '../../redux/store.ts';
import AuthOperations from '../../redux/auth/operations.ts';

// Is used to retrieve the latest data from the backend about user
export default function useRefreshUser() {
  const dispatch: AppDispatch = useDispatch();
  const { isRefreshing, token, isLoggedIn } = useSelector(selectAuth);

  useEffect(() => {
    if (!token) {
      return;
    }

    dispatch(AuthOperations.refreshUser());
  }, [dispatch]);

  return { isRefreshing, isLoggedIn };
}
