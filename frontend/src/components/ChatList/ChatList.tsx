import { ChatEntity } from '../../interfaces';
import { Box, Divider, Stack } from '@mui/material';
import ChatItem from '../ChatItem';
import { useNavigate } from 'react-router-dom';

interface Props {
  items: Array<ChatEntity>;
}

export default function ChatList({ items }: Props) {
  const navigate = useNavigate();

  return (
    <Stack spacing={2}>
      {items.map((item, index) => (
        <Box
          onClick={() => navigate(`/chat/${item.id}`)}
          sx={{
            cursor: 'pointer',
          }}
        >
          {index > 0 && (
            <Divider
              sx={{
                mb: 2,
              }}
            />
          )}
          <ChatItem data={item} />
        </Box>
      ))}
    </Stack>
  );
}
