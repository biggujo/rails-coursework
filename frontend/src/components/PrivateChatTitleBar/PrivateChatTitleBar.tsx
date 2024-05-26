import useFetchAllChatsQuery from '../../hooks/query/useFetchAllChatsQuery.ts';
import { useEffect, useState } from 'react';
import otherPersonChatFinder from '../../utils/other-person-chat-finder.ts';
import { Nullable } from '../../interfaces';
import { useSelector } from 'react-redux';
import { selectAuthUser } from '../../redux/auth/selectors.ts';
import UserEntity from '../../interfaces/UserEntity.interface.ts';
import ChatTitleBar from '../ChatTitleBar/ChatTitleBar.tsx';
import DateFormatter from '../../utils/date-formatter.ts';

interface Props {
  chatId: Nullable<number>;
}

const MIN_OFFLINE_MINUTES = 5;

export default function PrivateChatTitleBar({ chatId }: Props) {
  // No need to track error
  const { data, isLoading } = useFetchAllChatsQuery();
  const [otherPerson, setOtherPerson] = useState<Nullable<UserEntity>>(null);
  const { id: currentUserId } = useSelector(selectAuthUser);

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
    return <ChatTitleBar title={'Loading...'} />;
  }

  const isOnline =
    DateFormatter.getDistanceInMinutes(otherPerson.last_seen_at) <
    MIN_OFFLINE_MINUTES;

  return <ChatTitleBar title={otherPerson.nickname} isOnline={isOnline} />;
}
