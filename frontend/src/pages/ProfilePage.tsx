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
          {postsQuery.isLoading && (
            <Box height={400}>
              <Loader />
            </Box>
          )}
          {postsQuery.error && <Typography>{postsQuery.error}</Typography>}
          {!postsQuery.isLoading && postsQuery.data && (
            <>
              {createSubtitle('User posts')}
              {postsQuery.data.length > 0 ? (
                <PostsOperationsProvider apiContext={ProfilePostsOperations}>
                  <PostListInfiniteWrapper
                    id={Number(id)}
                    parentElId={null}
                    items={postsQuery.data}
                  />
                </PostsOperationsProvider>
              ) : (
                <Typography>No posts available.</Typography>
              )}
            </>
          )}
        </>
      )}
    </Container>
  );
}
