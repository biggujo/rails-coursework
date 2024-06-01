import useGetPostsQuery from '../hooks/query/useGetPostsQuery.ts';
import { AllPostsOperations } from '../redux/posts/operations.ts';
import { Box, Typography } from '@mui/material';
import Loader from '../components/Loader';
import { PostsOperationsProvider } from '../providers/PostsOperationsProvider.tsx';
import PostListInfiniteWrapper from '../components/PostListInfiniteWrapper';
import createSubtitle from '../utils/create-subtitle.tsx';

export default function MainPage() {
  const postsQuery = useGetPostsQuery({
    id: null,
    operations: AllPostsOperations,
  });

  return (
    <>
      {createSubtitle('Latest posts')}
      {postsQuery.isLoading && (
        <Box height={400}>
          <Loader />
        </Box>
      )}
      {!postsQuery.isLoading && postsQuery.data && (
        <>
          {postsQuery.data.length > 0 ? (
            <PostsOperationsProvider apiContext={AllPostsOperations}>
              <PostListInfiniteWrapper
                id={null}
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
  );
}
