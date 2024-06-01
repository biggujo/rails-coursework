import useFetchAllChatsQuery from '../../hooks/query/useFetchAllChatsQuery.ts';
import { useEffect, useState } from 'react';
import otherPersonChatFinder from '../../utils/other-person-chat-finder.ts';
import { Nullable } from '../../interfaces';
import { useSelector } from 'react-redux';
import { selectAuthUser } from '../../redux/auth/selectors.ts';
import UserEntity from '../../interfaces/UserEntity.interface.ts';
import ChatTitleBar from '../ChatTitleBar/ChatTitleBar.tsx';
import DateFormatter from '../../utils/date-formatter.ts';
import { useTranslation } from 'react-i18next';

interface Props {
  chatId: Nullable<number>;
}

export default function PrivateChatTitleBar({ chatId }: Props) {
  // No need to track error
  const { data, isLoading } = useFetchAllChatsQuery();
  const [otherPerson, setOtherPerson] = useState<Nullable<UserEntity>>(null);
  const { id: currentUserId } = useSelector(selectAuthUser);
  const { t } = useTranslation();

  useEffect(() => {
    if (!chatId) {
      return;
    }

    const chat = otherPersonChatFinder({
      chatList: data!,
      currentUserId,
      chatId,
    });

    setOtherPerson(chat);
  }, [chatId, currentUserId, data, setOtherPerson]);

  if (!otherPerson || isLoading) {
    return <ChatTitleBar title={t('status.loading')} />;
  }

  const isOnline =
    DateFormatter.getDistanceInMinutes(otherPerson.last_seen_at) <
    import.meta.env.VITE_MINUTES_TO_APPEAR_OFFLINE;

  return (
    <ChatTitleBar
      id={otherPerson.id}
      title={otherPerson.nickname}
      isOnline={isOnline}
      avatarSrc={otherPerson.profile_photo}
    />
  );
}
