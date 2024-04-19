import { ReactElement } from 'react';
import { useAuth } from '../../providers';
import { Navigate } from 'react-router-dom';

interface Props {
  redirectTo: string;
  component: ReactElement;
}

export default function PrivateRoute({
  redirectTo,
  component: Component,
}: Props) {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? Component : <Navigate to={redirectTo} />;
}
