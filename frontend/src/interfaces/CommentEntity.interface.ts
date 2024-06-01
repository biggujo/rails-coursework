import UserEntity from './UserEntity.interface.ts';

interface CommentEntity {
  id: number;
  text: string;
  likes_count: number;
  dislikes_count: number;
  liked: boolean;
  disliked: boolean;
  user: UserEntity;
  created_at: string;
  updated_at: string;
}

export default CommentEntity;
