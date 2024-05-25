import { ChatMessage } from '../../interfaces';
import { Grid } from '@mui/material';
import MessageItem from '../MessageItem';
import { useSelector } from 'react-redux';
import { selectAuthUser } from '../../redux/auth/selectors.ts';

interface Props {
  items: Array<ChatMessage>;
}

export default function MessageList({ items }: Props) {
  const user = useSelector(selectAuthUser);

  return (
    <Grid container direction={'column'} spacing={2}>
      {items.map(({ id, message, author_id, created_at }) => {
        const variant = author_id === user.id ? 'messageRight' : 'messageLeft';

        return (
          <Grid item key={id}>
            <MessageItem body={message} date={created_at} variant={variant} />
          </Grid>
        );
      })}
    </Grid>
  );
}
