import { AppDispatch } from '../../redux/store.ts';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectPostsError,
  selectPostsIsLoading,
  selectPostsItems,
  selectPostsMetadata,
} from '../../redux/posts/selectors.ts';
import { useEffect, useRef } from 'react';
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
  const isFirstRender = useRef(true);

  const data = useSelector(selectPostsItems);
  const isLoading = useSelector(selectPostsIsLoading);
  const error = useSelector(selectPostsError);

  const metadata = useSelector(selectPostsMetadata);

  const options = {
    id,
    page: metadata.page || 1,
    offset: metadata.offset || 0,
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    dispatch(Operations.fetchAll(options));
    // eslint-disable-next-line
  }, []);

  return { data, isLoading, error };
};

export default useGetPostsQuery;
