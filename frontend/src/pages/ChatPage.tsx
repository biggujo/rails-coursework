import { useParams } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import { useAuth } from '../providers';
import ChatPanel from '../components/ChatPanel';

export default function ChatPage() {
  const { id: otherPersonId } = useParams();
  const {
    user: { id: currentUserId },
  } = useAuth();

  return (
    <Container>
      <Typography>Your ID: {currentUserId}</Typography>
      <Typography>Other person ID: {otherPersonId}</Typography>
      <ChatPanel otherPersonId={otherPersonId} />
    </Container>
  );
}
