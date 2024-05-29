import { AppDispatch } from '../../redux/store.ts';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectPostsError,
  selectPostsIsLoading,
  selectPostsItems,
} from '../../redux/posts/selectors.ts';
import { useEffect } from 'react';
import PostsOperations from '../../redux/posts/operations.ts';

const useGetPostsQuery = (id: number) => {
  const dispatch: AppDispatch = useDispatch();

  const data = useSelector(selectPostsItems);
  const isLoading = useSelector(selectPostsIsLoading);
  const error = useSelector(selectPostsError);

  useEffect(() => {
    dispatch(PostsOperations.fetchAll(id));
  }, [dispatch, id]);

  return { data, isLoading, error };
};

export default useGetPostsQuery;
