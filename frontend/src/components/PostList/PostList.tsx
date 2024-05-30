import { PostEntity } from '../../interfaces';
import PostItem from '../PostCard';
import { ListItem, Stack } from '@mui/material';

interface Props {
  items: Array<PostEntity>;
}

export default function PostList({ items }: Props) {
  return (
    <Stack gap={2}>
      {items.map(item => (
        <ListItem key={item.id}>
          <PostItem data={item} />
        </ListItem>
      ))}
    </Stack>
  );
}
