import { ChatEntity } from '../../interfaces';
import { Box, Divider, Stack } from '@mui/material';
import ChatItem from '../ChatItem';
import { useNavigate } from 'react-router-dom';
import { selectAuthUser } from '../../redux/auth/selectors.ts';
import otherPersonChatFinder from '../../utils/other-person-chat-finder.ts';
import { useSelector } from 'react-redux';

interface Props {
  items: Array<ChatEntity>;
}

export default function ChatList({ items }: Props) {
  const navigate = useNavigate();
  const currentUser = useSelector(selectAuthUser);

  return (
    <Stack spacing={2}>
      {items.map((item, index, array) => {
        const otherPerson = otherPersonChatFinder({
          currentUserId: currentUser.id,
          chatList: array,
          chatId: item.id,
        });

        return (
          <Box
            onClick={() => navigate(`/chat/${otherPerson!.id}`)}
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
        );
      })}
    </Stack>
  );
}
