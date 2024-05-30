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
import PasswordResetRequestPage from '../../pages/PasswordResetRequestPage.tsx';
import PasswordResetRecoveryPage from '../../pages/PasswordResetRecoveryPage.tsx';
import { useSelector } from 'react-redux';
import { selectAuthIsRefreshing } from '../../redux/auth/selectors.ts';
import EditProfilePage from '../../pages/EditProfilePage.tsx';
import GroupsPage from '../../pages/GroupsPage.tsx';
import GroupPage from '../../pages/GroupPage.tsx';

export default function App() {
  const isTokenLoading = useAuthorizationTokenLoader();
  const isRefreshing = useSelector(selectAuthIsRefreshing);
  const navigate = useNavigate();
  useRefreshUser(isTokenLoading);

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
        <Route path={'/password'}>
          <Route index element={<NotFound />} />
          <Route
            path={'edit'}
            element={
              <RestrictedRoute
                redirectTo={'/'}
                component={<PasswordResetRecoveryPage />}
              />
            }
          />
          <Route
            path={'reset/request'}
            element={
              <RestrictedRoute
                redirectTo={'/'}
                component={<PasswordResetRequestPage />}
              />
            }
          />
        </Route>
        <Route
          path={'/profile_edit'}
          element={
            <PrivateRoute
              redirectTo={'/sign-in'}
              component={<EditProfilePage />}
            />
          }
        />
        <Route
          path={'/profile/:id'}
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
          path={'/groups'}
          element={<PrivateRoute redirectTo={'/'} component={<GroupsPage />} />}
        />
        <Route
          path={'/group/:id'}
          element={<PrivateRoute redirectTo={'/'} component={<GroupPage />} />}
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
