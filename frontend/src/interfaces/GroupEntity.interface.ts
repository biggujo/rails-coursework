import UserEntity from './UserEntity.interface.ts';

interface GroupEntity {
  id: number;
  name: string;
  description: string;
  members_count: number;
  profile_photo: string;
  is_joined: false;
  is_creator: true;
  user: UserEntity;
}

export default GroupEntity;
