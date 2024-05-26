import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthIsLoggedIn } from '../../redux/auth/selectors.ts';

interface Props {
  redirectTo: string;
  component: ReactElement;
}

export default function PrivateRoute({
  redirectTo,
  component: Component,
}: Props) {
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);

  return isLoggedIn ? Component : <Navigate to={redirectTo} />;
}
