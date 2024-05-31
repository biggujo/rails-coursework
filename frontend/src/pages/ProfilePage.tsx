import { Box, Container, Typography } from '@mui/material';
import useGetProfileQuery from '../hooks/query/useGetProfileQuery.ts';
import { AxiosError } from 'axios';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import { UserProfile } from '../components/Profile';
import useGetPostsQuery from '../hooks/query/useGetPostsQuery.ts';
import createSubtitle from '../utils/create-subtitle.tsx';
import PostList from '../components/PostList';
import { PostsOperationsProvider } from '../providers/PostsOperationsProvider.tsx';
import { ProfilePostsOperations } from '../redux/posts/operations.ts';

export default function ProfilePage() {
  const { id } = useParams();
  const profileQuery = useGetProfileQuery(Number(id));
  const postsQuery = useGetPostsQuery({
    id: Number(id),
    operations: ProfilePostsOperations,
  });

  return (
    <Container>
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
                  <PostList items={postsQuery.data} />
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
