import { Dispatch, SetStateAction } from 'react';

interface AuthInformation {
  isLoggedIn: boolean,
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>,
  user: {
    email: string,
  },
  setUser: Dispatch<SetStateAction<object | null>>,
}

export default AuthInformation;
