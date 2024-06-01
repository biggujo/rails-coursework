import useGetPostsQuery from '../hooks/query/useGetPostsQuery.ts';
import { AllPostsOperations } from '../redux/posts/operations.ts';
import { Box, Button, Stack, Typography } from '@mui/material';
import Loader from '../components/Loader';
import { PostsOperationsProvider } from '../providers/PostsOperationsProvider.tsx';
import PostListInfiniteWrapper from '../components/PostListInfiniteWrapper';
import createSubtitle from '../utils/create-subtitle.tsx';
import { useTranslation } from 'react-i18next';
import downloadCsv from '../utils/download-csv.ts';
import API from '../utils/api.ts';
import { FileCopy } from '@mui/icons-material';
import myToast from '../utils/myToast.tsx';
import { useEffect } from 'react';
import { resetPosts, resetPostsMetadata } from '../redux/posts/slice.ts';
import { useDispatch } from 'react-redux';

export default function MainPage() {
  const dispatch = useDispatch();
  const postsQuery = useGetPostsQuery({
    id: null,
    operations: AllPostsOperations,
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
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        sx={{
          px: 2,
        }}
      >
        {createSubtitle(t('post.latestPosts'))}
        <Button
          variant={'outlined'}
          startIcon={<FileCopy />}
          onClick={async () => {
            myToast({
              message: t('form.downloadWillStartSoon'),
              severity: 'info',
            });
            const csv = await API.exportToCsv.allPosts();
            downloadCsv('posts.csv', csv);
          }}
          sx={{
            width: '200px',
          }}
        >
          CSV
        </Button>
      </Stack>
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
