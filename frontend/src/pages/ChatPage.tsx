import { useParams } from 'react-router-dom';
import ChatPanel from '../components/ChatPanel';
import createSubtitle from '../utils/create-subtitle.tsx';
import { useTranslation } from 'react-i18next';

export default function ChatPage() {
  const { id: otherPersonId } = useParams();
  const { t } = useTranslation();

  return (
    <>
      {createSubtitle(t('chat.chat'))}
      <ChatPanel otherPersonId={Number(otherPersonId)} />
    </>
  );
}
