import { ChatMessage } from '../../interfaces';
import { Typography } from '@mui/material';

interface Props {
  items: Array<ChatMessage>;
}

export default function MessageList({ items }: Props) {
  return (
    <ul>
      {items.map(({ message, author_id }) => (
        <>
          <Typography>Author: {author_id}</Typography>
          <Typography>{message}</Typography>
        </>
      ))}
    </ul>
  );
}
