import { Route, Routes, useNavigate } from 'react-router-dom';
import { Button, CssBaseline } from '@mui/material';
import { Toaster } from 'react-hot-toast';
import {
  HomePage,
  NotFound,
  ProfilePage,
  SignInPage,
  SignUpPage,
} from '../../pages';
import PrivateRoute from '../PrivateRoute';
import UsersPage from '../../pages/UsersPage.tsx';
import useRefreshUser from '../../hooks/query/useRefreshUser.ts';
import ChatPage from '../../pages/ChatPage.tsx';
import RestrictedRoute from '../RestrictedRoute/RestrictedRoute.tsx';
import useAuthorizationTokenLoader from '../../hooks/useAxiosAuthorizationLoader.ts';
import PasswordResetRequest from '../../pages/PasswordResetRequest.tsx';

export default function App() {
  const { isRefreshing } = useRefreshUser();
  const navigate = useNavigate();
  const isTokenLoading = useAuthorizationTokenLoader();

  if (!isTokenLoading || isRefreshing) {
    return null;
  }

  return (
    <>
      <Button onClick={() => navigate('/')}>Go home</Button>
      <Routes>
        <Route path={'/'} element={<HomePage />} />
        <Route
          path={'/sign-in'}
          element={
            <RestrictedRoute redirectTo={'/'} component={<SignInPage />} />
          }
        />
        <Route
          path={'/sign-up'}
          element={
            <RestrictedRoute redirectTo={'/'} component={<SignUpPage />} />
          }
        />
        <Route path={'/password/reset'}>
          <Route index element={<NotFound />} />
          <Route
            path={'request'}
            element={
              <RestrictedRoute
                redirectTo={'/'}
                component={<PasswordResetRequest />}
              />
            }
          />
        </Route>
        <Route
          path={'/profile'}
          element={
            <PrivateRoute redirectTo={'/sign-in'} component={<ProfilePage />} />
          }
        />
        <Route
          path={'/users'}
          element={
            <PrivateRoute redirectTo={'/sign-in'} component={<UsersPage />} />
          }
        />
        <Route
          path={'/chat/:id'}
          element={
            <PrivateRoute redirectTo={'/sign-in'} component={<ChatPage />} />
          }
        />
        <Route path={'*'} element={<NotFound />} />
      </Routes>
      <CssBaseline />
      <Toaster position={'top-right'} />
    </>
  );
}
