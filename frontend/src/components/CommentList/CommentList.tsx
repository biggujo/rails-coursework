import { Box, ListItem, Stack, Typography } from '@mui/material';
import Loader from '../Loader';
import CommentItem from '../CommentItem/CommentItem.tsx';
import useFetchCommentsByPostId from '../../hooks/query/useFetchCommentsByPostId.ts';

interface Props {
  postId: number;
}

export default function CommentList({ postId }: Props) {
  const { items, isLoading, error } = useFetchCommentsByPostId(postId);

  if (isLoading) {
    return (
      <Box height={'100px'}>
        <Loader />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography>An error have just happened. Try again later</Typography>
    );
  }

  if (items!.length === 0) {
    return (
      <Typography pl={4} pb={4}>
        No comments available.
      </Typography>
    );
  }

  return (
    <Stack
      component={'ul'}
      style={{
        margin: 0,
        padding: 0,
      }}
    >
      {items!.map(item => (
        <ListItem key={item.id}>
          <CommentItem data={item} postId={postId} />
        </ListItem>
      ))}
    </Stack>
  );
}
