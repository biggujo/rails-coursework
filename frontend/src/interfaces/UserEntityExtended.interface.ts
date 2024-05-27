interface UserEntityExtended {
  id: number;
  email: string;
  nickname: string;
  country: string;
  city: string;
  full_name: string;
  profile_photo?: string;
  created_at: string;
  updated_at: string;
}

export default UserEntityExtended;
