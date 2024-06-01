import { ChatEntity } from '../../interfaces';
import { Box, Stack, Typography } from '@mui/material';
import MyAvatar from '../MyAvatar/MyAvatar.tsx';
import DateFormatter from '../../utils/date-formatter.ts';
import { useSelector } from 'react-redux';
import { selectAuthUser } from '../../redux/auth/selectors.ts';

interface Props {
  data: ChatEntity;
}

export default function ChatItem({ data }: Props) {
  const currentUser = useSelector(selectAuthUser);

  const otherPerson =
    data.user_1.id === currentUser.id ? data.user_2 : data.user_1;

  const latestMessage = data.latest_message;

  const formattedDate = latestMessage
    ? DateFormatter.formatRelativeToNow(latestMessage.created_at)
    : '';

  return (
    <Stack direction={'row'} justifyContent={'space-between'}>
      <Stack direction={'row'} gap={2} alignItems={'center'}>
        <MyAvatar
          alt={otherPerson.nickname}
          size={'small'}
          src={otherPerson.profile_photo}
        />
        <Box>
          <Typography variant={'h5'}>{otherPerson.nickname}</Typography>
          <Typography>
            {latestMessage && 'Latest message: '}
            {latestMessage?.message || ''}
          </Typography>
        </Box>
      </Stack>
      <Typography>{formattedDate}</Typography>
    </Stack>
  );
}
