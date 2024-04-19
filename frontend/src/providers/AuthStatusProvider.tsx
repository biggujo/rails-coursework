import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { User } from '../interfaces';
import useLocalStorage from '../hooks';

interface AuthProviderValues {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean | null>>;
  user: User;
  setUser: Dispatch<SetStateAction<object | null>>;
}

const AuthStatusContext = createContext<AuthProviderValues>(null!);

export const useAuth: () => AuthProviderValues = () =>
  useContext(AuthStatusContext);

interface Props {
  children: ReactNode;
}

export const AuthStatusProvider = ({ children }: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage('is-logged-in');
  const [user, setUser] = useState('user');

  const authStatus = {
    isLoggedIn,
    setIsLoggedIn,
    user,
    setUser,
  };

  return (
    <AuthStatusContext.Provider value={authStatus}>
      {children}
    </AuthStatusContext.Provider>
  );
};
