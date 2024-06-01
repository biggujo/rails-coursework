import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import useFetchGroupQuery from '../hooks/query/useFetchGroupQuery.ts';
import Loader from '../components/Loader';
import { AxiosError } from 'axios';
import useGetPostsQuery from '../hooks/query/useGetPostsQuery.ts';
import { GroupPostsOperations } from '../redux/posts/operations.ts';
import { PostsOperationsProvider } from '../providers/PostsOperationsProvider.tsx';
import GroupProfile from '../components/Group';
import createSubtitle from '../utils/create-subtitle.tsx';
import PostListInfiniteWrapper from '../components/PostListInfiniteWrapper';
import { AppDispatch } from '../redux/store.ts';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { resetPosts, resetPostsMetadata } from '../redux/posts/slice.ts';
import createSmallSubtitle from '../utils/create-small-subtitle.tsx';
import PostsFiltersForm from '../components/PostsFilters/PostsFiltersForm.tsx';
import { useTranslation } from 'react-i18next';

export default function GroupPage() {
  const { id } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const { data, isLoading, isSuccess, isError, error } = useFetchGroupQuery(
    Number(id)
  );
  const postsQuery = useGetPostsQuery({
    id: Number(id),
    operations: GroupPostsOperations,
  });
  const { t } = useTranslation();

  useEffect(() => {
    return () => {
      dispatch(resetPostsMetadata());
      dispatch(resetPosts());
    };
  }, [dispatch]);

  return (
    <>
      {isLoading && (
        <Box height={400}>
          <Loader />
        </Box>
      )}
      {isError && (
        <Typography>{(error as AxiosError).response!.statusText}</Typography>
      )}
      {isSuccess && (
        <>
          <GroupProfile groupData={data} />
          {createSubtitle(t('group.posts'))}
          {createSmallSubtitle(t('form.filters'))}
          <PostsFiltersForm />
          {createSmallSubtitle(t('post.posts'))}

          {postsQuery.isLoading && (
            <Box height={400}>
              <Loader />
            </Box>
          )}
          {postsQuery.error && <Typography>{postsQuery.error}</Typography>}
          {!postsQuery.isLoading && postsQuery.data && (
            <>
              {postsQuery.data.length > 0 ? (
                <PostsOperationsProvider apiContext={GroupPostsOperations}>
                  <PostListInfiniteWrapper
                    id={Number(id)}
                    parentElId={null}
                    items={postsQuery.data}
                  />
                </PostsOperationsProvider>
              ) : (
                <Typography>{t('post.noPostsAvailable')}</Typography>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}
