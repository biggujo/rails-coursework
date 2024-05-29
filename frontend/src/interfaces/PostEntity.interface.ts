import UserEntity from './UserEntity.interface.ts';

interface PostEntity {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  likes_count: string;
  dislikes_count: string;
  user: UserEntity;
  liked: boolean;
  disliked: boolean;
  // TODO: group
  // TODO: report
  // TODO: liked
}

export default PostEntity;
