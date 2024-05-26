import { useDispatch, useSelector } from 'react-redux';
import { selectProfile } from '../../redux/profile/selectors.ts';
import ProfileOperations from '../../redux/profile/operations.ts';
import { useEffect } from 'react';
import { AppDispatch } from '../../redux/store.ts';

function useGetProfileQuery() {
  const dispatch: AppDispatch = useDispatch();
  const { data, isLoading, error } = useSelector(selectProfile);

  useEffect(() => {
    dispatch(ProfileOperations.fetchProfileData());
  }, [dispatch]);

  return { data, isLoading, error };
}

export default useGetProfileQuery;
