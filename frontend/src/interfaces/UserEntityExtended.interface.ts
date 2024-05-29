interface UserEntityExtended {
  id: number;
  email: string;
  nickname: string;
  country: string;
  city: string;
  full_name: string;
  friends: {
    friends: number;
    following: number;
    followers: number;
  };
  profile_photo?: string;
  is_following: boolean;
  created_at: string;
  updated_at: string;
}

export default UserEntityExtended;
