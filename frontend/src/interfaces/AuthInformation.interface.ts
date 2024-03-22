import { Dispatch, SetStateAction } from 'react';

interface AuthInformation {
  isLoggedIn: boolean,
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>,
  user: {
    email: string,
    nickname: string,
    created_at: string,
  },
  setUser: Dispatch<SetStateAction<object | null>>,
}

export default AuthInformation;
