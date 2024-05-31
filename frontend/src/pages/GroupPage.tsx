import { Box, Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import useFetchGroupQuery from '../hooks/query/useFetchGroupQuery.ts';
import Loader from '../components/Loader';
import { AxiosError } from 'axios';
import useGetPostsQuery from '../hooks/query/useGetPostsQuery.ts';
import { GroupPostsOperations } from '../redux/posts/operations.ts';
import PostList from '../components/PostList';
import { PostsOperationsProvider } from '../providers/PostsOperationsProvider.tsx';
import GroupProfile from '../components/Group';
import createSubtitle from '../utils/create-subtitle.tsx';

export default function GroupPage() {
  const { id } = useParams();
  const { data, isSuccess, isLoading, isError, error } = useFetchGroupQuery(
    Number(id)
  );
  const postsQuery = useGetPostsQuery({
    id: Number(id),
    operations: GroupPostsOperations,
  });

  return (
    <Container>
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
          {createSubtitle('Group posts')}
          {postsQuery.data.length > 0 ? (
            <PostsOperationsProvider apiContext={GroupPostsOperations}>
              <PostList items={postsQuery.data} />
            </PostsOperationsProvider>
          ) : (
            <Typography>No posts available.</Typography>
          )}
        </>
      )}
    </Container>
  );
}
