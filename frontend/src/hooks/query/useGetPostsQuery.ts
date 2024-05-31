import { AppDispatch } from '../../redux/store.ts';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectPostsError,
  selectPostsIsLoading,
  selectPostsItems,
} from '../../redux/posts/selectors.ts';
import { useEffect } from 'react';
import { PostsOperations } from '../../redux/posts/operations.ts';

interface FunctionInterface {
  id: number;
  operations: PostsOperations;
}

const useGetPostsQuery = ({
  id,
  operations: Operations,
}: FunctionInterface) => {
  const dispatch: AppDispatch = useDispatch();

  const data = useSelector(selectPostsItems);
  const isLoading = useSelector(selectPostsIsLoading);
  const error = useSelector(selectPostsError);

  useEffect(() => {
    dispatch(Operations.fetchAll(id));
  }, [Operations, dispatch, id]);

  return { data, isLoading, error };
};

export default useGetPostsQuery;
