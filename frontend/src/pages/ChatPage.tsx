import { useParams } from 'react-router-dom';
import ChatPanel from '../components/ChatPanel';
import createSubtitle from '../utils/create-subtitle.tsx';

export default function ChatPage() {
  const { id: otherPersonId } = useParams();

  return (
    <>
      {createSubtitle('Chat')}
      <ChatPanel otherPersonId={Number(otherPersonId)} />
    </>
  );
}
