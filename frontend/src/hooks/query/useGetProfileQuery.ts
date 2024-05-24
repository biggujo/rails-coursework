import { useDispatch, useSelector } from 'react-redux';
import { selectAuth } from '../../redux/auth/selectors.ts';
import AuthOperations from '../../redux/auth/operations.ts';
import { useEffect } from 'react';
import { AppDispatch } from '../../redux/store.ts';

function useGetProfileQuery() {
  const dispatch: AppDispatch = useDispatch();
  const { data, isLoading, error } = useSelector(selectAuth);

  useEffect(() => {
    dispatch(AuthOperations.fetchProfileData());
  }, [dispatch]);

  return { data, isLoading, error };
}

export default useGetProfileQuery;
