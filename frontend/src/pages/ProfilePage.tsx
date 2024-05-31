import { Box, Container, Typography } from '@mui/material';
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
import { resetPosts } from '../redux/posts/slice.ts';
import PostsFiltersForm from '../components/PostsFilters/PostsFiltersForm.tsx';
import createSmallSubtitle from '../utils/create-small-subtitle.tsx';

export default function ProfilePage() {
  const { id } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const profileQuery = useGetProfileQuery(Number(id));
  const postsQuery = useGetPostsQuery({
    id: Number(id),
    operations: ProfilePostsOperations,
  });

  useEffect(() => {
    return () => {
      dispatch(resetPosts());
    };
  }, [dispatch]);

  return (
    <Container id={'container'}>
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
          {createSubtitle('User posts')}
          {createSmallSubtitle('Filters')}
          <PostsFiltersForm />
          {createSmallSubtitle('Posts')}

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
                <Typography>No posts available.</Typography>
              ))}
          </PostsOperationsProvider>
        </>
      )}
    </Container>
  );
}
