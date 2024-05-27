import { useParams } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import ChatPanel from '../components/ChatPanel';
import { useSelector } from 'react-redux';
import { selectAuthUser } from '../redux/auth/selectors.ts';

export default function ChatPage() {
  const { id: otherPersonId } = useParams();
  const { id: currentUserId } = useSelector(selectAuthUser);

  return (
    <Container>
      <Typography>Your ID: {currentUserId}</Typography>
      <Typography>Other person ID: {otherPersonId}</Typography>
      <ChatPanel otherPersonId={Number(otherPersonId)} />
    </Container>
  );
}
