import Nullable from './Nullable.interface.ts';

export interface ProfileUpdateFormAPI {
  id: number;
  email: string;
  nickname: string;
  profile_photo: Nullable<File>;
}
