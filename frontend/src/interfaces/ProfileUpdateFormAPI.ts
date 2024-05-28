import Nullable from './Nullable.interface.ts';

export interface ProfileUpdateFormAPI {
  id: number;
  email: string;
  nickname: string;
  country: string;
  city: string;
  full_name: string;
  profile_photo: Nullable<File>;
}
