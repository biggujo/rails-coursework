import { ReactElement } from 'react';
import { useAuth } from '../../providers';
import { Navigate } from 'react-router-dom';
import { Typography } from '@mui/material';

interface Props {
  redirectTo: string;
  component: ReactElement;
}

export default function PrivateRoute({
  redirectTo,
  component: Component,
}: Props) {
  const { isLoggedIn, isRefreshing } = useAuth();

  if (isRefreshing) {
    return <Typography>Refreshing...</Typography>;
  }

  return isLoggedIn ? Component : <Navigate to={redirectTo} />;
}
