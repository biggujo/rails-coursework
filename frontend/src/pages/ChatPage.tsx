import { useParams } from 'react-router-dom';
import ChatPanel from '../components/ChatPanel';
import createSubtitle from '../utils/create-subtitle.tsx';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { AppDispatch } from '../redux/store.ts';
import { useDispatch } from 'react-redux';
import { resetChat } from '../redux/chatMessages/slice.ts';

export default function ChatPage() {
  const dispatch: AppDispatch = useDispatch();
  const { id: otherPersonId } = useParams();
  const { t } = useTranslation();

  useEffect(() => {
    return () => {
      dispatch(resetChat());
    };
  }, [dispatch]);

  return (
    <>
      {createSubtitle(t('chat.chat'))}
      <ChatPanel otherPersonId={Number(otherPersonId)} />
    </>
  );
}
