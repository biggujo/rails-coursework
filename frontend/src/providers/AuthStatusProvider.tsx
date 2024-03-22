import { createContext, ReactNode, useContext } from 'react';
import { AuthInformation } from '../interfaces';
import useLocalStorage from '../hooks';

const AuthStatusContext = createContext<AuthInformation>(null!);

export const useAuth: () => AuthInformation = () => useContext(AuthStatusContext)!;

interface Props {
  children: ReactNode;
}

export const AuthStatusProvider = ({ children }: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage('is-logged-in');
  const [user, setUser] = useLocalStorage('user');

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
