import { Box, ListItem, Stack, Typography } from '@mui/material';
import Loader from '../Loader';
import CommentItem from '../CommentItem/CommentItem.tsx';
import useFetchCommentsByPostId from '../../hooks/query/useFetchCommentsByPostId.ts';
import { useTranslation } from 'react-i18next';

interface Props {
  postId: number;
}

export default function CommentList({ postId }: Props) {
  const { items, isLoading, error } = useFetchCommentsByPostId(postId);
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <Box height={'100px'}>
        <Loader />
      </Box>
    );
  }

  if (error) {
    return <Typography>{t('error.tryAgainLater')}</Typography>;
  }

  if (items!.length === 0) {
    return (
      <Typography pl={4} pb={4}>
        {t('comments.noCommentsAvailable')}
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
