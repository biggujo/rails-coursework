import { ReactElement } from 'react';
import { useAuth } from '../../providers';
import { Navigate, useHistory } from 'react-router-dom';

interface Props {
  redirectTo: string;
  component: ReactElement;
}

export default function RestrictedRoute({
                                          redirectTo,
                                          component: Component,
                                        }: Props) {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Navigate to={redirectTo} /> : Component;
}
