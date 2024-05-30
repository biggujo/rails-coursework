import { Box, Container, Typography } from '@mui/material';
import useGetProfileQuery from '../hooks/query/useGetProfileQuery.ts';
import { AxiosError } from 'axios';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import { UserProfile } from '../components/Profile';
import useGetPostsQuery from '../hooks/query/useGetPostsQuery.ts';
import createSubtitle from '../utils/create-subtitle.tsx';
import PostList from '../components/PostList';
import CommentItem from '../components/CommentItem/CommentItem.tsx';

export default function ProfilePage() {
  const { id } = useParams();
  const profileQuery = useGetProfileQuery(Number(id));
  const postsQuery = useGetPostsQuery(Number(id));

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
          <CommentItem
            data={{
              id: 1,
              text: 'sdfdsfsdfsdfsdf',
              created_at: '2024-05-26T17:56:18.036Z',
              updated_at: '2024-05-26T17:56:18.036Z',
              post_id: 2,
              likes_count: 0,
              dislikes_count: 0,
              user: {
                id: 36,
                email: 'd@d.d',
                last_seen_at: '2024-05-26T17:28:26.862Z',
                nickname: 'ddd',
                full_name: 'John Smith',
                created_at: '2024-05-24T09:50:54.938Z',
                profile_photo: null,
              },
              liked: false,
              disliked: false,
            }}
          />
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
                <PostList items={postsQuery.data} />
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
