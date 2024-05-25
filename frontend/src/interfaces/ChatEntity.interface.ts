interface UserEntity {
  id: number;
  email: string;
  nickname: string;
  created_at: string;
}

interface ChatEntityInterface {
  id: number;
  user_1: UserEntity;
  user_2: UserEntity;
  created_at: string;
  updated_at: string;
}

export default ChatEntityInterface;
