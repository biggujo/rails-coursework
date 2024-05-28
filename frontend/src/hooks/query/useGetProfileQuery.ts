import { useDispatch, useSelector } from 'react-redux';
import { selectProfile } from '../../redux/profile/selectors.ts';
import ProfileOperations from '../../redux/profile/operations.ts';
import { useEffect } from 'react';
import { AppDispatch } from '../../redux/store.ts';

function useGetProfileQuery(id: number) {
  const dispatch: AppDispatch = useDispatch();
  const { data, isLoading, error } = useSelector(selectProfile);

  useEffect(() => {
    dispatch(ProfileOperations.fetchProfileData(id));
  }, [dispatch, id]);

  return { data, isLoading, error };
}

export default useGetProfileQuery;
