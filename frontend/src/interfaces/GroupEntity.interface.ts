import UserEntity from './UserEntity.interface.ts';

interface GroupEntity {
  id: number;
  name: string;
  description: string;
  members_count: number;
  user: UserEntity;
}

export default GroupEntity;
