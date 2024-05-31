import UserEntity from './UserEntity.interface.ts';
import { GroupEntity, Nullable } from './index.ts';

interface PostEntity {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  likes_count: number;
  dislikes_count: number;
  user: UserEntity;
  group: Nullable<GroupEntity>;
  liked: boolean;
  disliked: boolean;
  // TODO: group
  // TODO: report
  // TODO: liked
}

export default PostEntity;
