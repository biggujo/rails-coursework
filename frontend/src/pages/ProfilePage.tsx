import { Box, Typography } from '@mui/material';
import useGetProfileQuery from '../hooks/query/useGetProfileQuery.ts';
import { AxiosError } from 'axios';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import { UserProfile } from '../components/Profile';
import useGetPostsQuery from '../hooks/query/useGetPostsQuery.ts';
import createSubtitle from '../utils/create-subtitle.tsx';
import { PostsOperationsProvider } from '../providers/PostsOperationsProvider.tsx';
import { ProfilePostsOperations } from '../redux/posts/operations.ts';
import PostListInfiniteWrapper from '../components/PostListInfiniteWrapper';
import { useEffect } from 'react';
import { AppDispatch } from '../redux/store.ts';
import { useDispatch } from 'react-redux';
import { resetPosts, resetPostsMetadata } from '../redux/posts/slice.ts';
import PostsFiltersForm from '../components/PostsFilters/PostsFiltersForm.tsx';
import createSmallSubtitle from '../utils/create-small-subtitle.tsx';
import { useTranslation } from 'react-i18next';

export default function ProfilePage() {
  const { id } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const profileQuery = useGetProfileQuery(Number(id));
  const postsQuery = useGetPostsQuery({
    id: Number(id),
    operations: ProfilePostsOperations,
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
      {profileQuery.isLoading && (
        <Box height={400}>
          <Loader />
        </Box>
      )}
      {profileQuery.error && (
        <Typography>
          {(profileQuery.error as AxiosError).response!.statusText}
        </Typography>
      )}
      {!profileQuery.isLoading && profileQuery.data && (
        <>
          <UserProfile userData={profileQuery.data} />
          {createSubtitle(t('profile.profilePosts'))}
          {createSmallSubtitle(t('form.filters'))}
          <PostsFiltersForm />
          {createSmallSubtitle(t('post.posts'))}

          {postsQuery.isLoading && (
            <Box height={400}>
              <Loader />
            </Box>
          )}

          {postsQuery.error && <Typography>{postsQuery.error}</Typography>}
          <PostsOperationsProvider apiContext={ProfilePostsOperations}>
            {!postsQuery.isLoading &&
              postsQuery.data &&
              (postsQuery.data.length > 0 ? (
                <PostListInfiniteWrapper
                  id={Number(id)}
                  parentElId={null}
                  items={postsQuery.data}
                />
              ) : (
                <Typography>{t('post.noPostsAvailable')}</Typography>
              ))}
          </PostsOperationsProvider>
        </>
      )}
    </>
  );
}
