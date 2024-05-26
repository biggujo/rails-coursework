import { ChatEntity, Nullable } from '../interfaces';
import UserEntity from '../interfaces/UserEntity.interface.ts';

interface FunctionInterface {
  chatList: Array<ChatEntity>;
  currentUserId: number;
  chatId: number;
}

const otherPersonChatFinder = ({
  chatList,
  currentUserId,
  chatId,
}: FunctionInterface): Nullable<UserEntity> => {
  // Find chat
  const chat = chatList.find(({ id }) => id === chatId);

  if (typeof chat === 'undefined') {
    return null;
  }

  if (chat.user_1.id === currentUserId) {
    return chat.user_2;
  }

  return chat.user_1;
};

export default otherPersonChatFinder;
