import UserEntity from './UserEntity.interface.ts';

interface ChatEntityInterface {
  id: number;
  user_1: UserEntity;
  user_2: UserEntity;
  created_at: string;
  updated_at: string;
}

export default ChatEntityInterface;
