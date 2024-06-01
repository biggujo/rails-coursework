import UserEntity from './UserEntity.interface.ts';
import MessageEntity from './MessageEntity.interface.ts';

interface ChatEntityInterface {
  id: number;
  user_1: UserEntity;
  user_2: UserEntity;
  latest_message?: MessageEntity;
  created_at: string;
  updated_at: string;
}

export default ChatEntityInterface;
