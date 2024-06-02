import { AppDispatch } from '../../redux/store.ts';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectPostsError,
  selectPostsIsLoading,
  selectPostsItems,
  selectPostsMetadata,
} from '../../redux/posts/selectors.ts';
import { useEffect, useState } from 'react';
import {
  PostsOperations,
  resetPostsMetadata,
} from '../../redux/posts/operations.ts';
import { selectPostsFilters } from '../../redux/filters/selectors.ts';
import { Nullable } from '../../interfaces';
import { resetPostsFilters } from '../../redux/filters/operations.ts';

interface FunctionInterface {
  id: Nullable<number>;
  operations: PostsOperations | Pick<PostsOperations, 'fetchAll'>;
}

const useGetPostsQuery = ({
  id,
  operations: Operations,
}: FunctionInterface) => {
  const dispatch: AppDispatch = useDispatch();
  const [isFirstRender, setIsFirstRender] = useState(true);

  const data = useSelector(selectPostsItems);
  const isLoading = useSelector(selectPostsIsLoading);
  const error = useSelector(selectPostsError);

  const metadata = useSelector(selectPostsMetadata);
  const filters = useSelector(selectPostsFilters);

  const options = {
    id,
    page: metadata.page || 1,
    offset: metadata.offset || 0,
    filterData: filters,
  };

  useEffect(() => {
    (async () => {
      if (isFirstRender) {
        await dispatch(resetPostsFilters()).unwrap();
        await dispatch(resetPostsMetadata()).unwrap();
        setIsFirstRender(false);
        return;
      }

      dispatch(Operations.fetchAll(options));
    })();
    // eslint-disable-next-line
  }, [filters, isFirstRender]);

  return { data, isLoading, error };
};

export default useGetPostsQuery;
