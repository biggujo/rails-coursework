import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { User } from '../interfaces';

interface AuthProviderValues {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean | null>>;
  isRefreshing: boolean;
  setIsRefreshing: Dispatch<SetStateAction<boolean | null>>;
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(true);
  const [user, setUser] = useState(null);

  const authStatus = {
    isLoggedIn,
    setIsLoggedIn,
    isRefreshing,
    setIsRefreshing,
    user,
    setUser,
  };

  return (
    <AuthStatusContext.Provider value={authStatus}>
      {children}
    </AuthStatusContext.Provider>
  );
};
