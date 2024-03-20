import { createContext, ReactNode, useContext, useState } from 'react';
import { AuthInformation } from '../interfaces';

const AuthStatusContext = createContext<AuthInformation>(null!);

export const useAuth: () => AuthInformation = () => useContext(AuthStatusContext)!;

interface Props {
  children: ReactNode;
}

export const AuthStatusProvider = ({ children }: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null!);

  const authStatus = {
    isLoggedIn,
    setIsLoggedIn,
    user,
    setUser,
  };

  return <AuthStatusContext.Provider value={authStatus}>
    {children}
  </AuthStatusContext.Provider>;
};
