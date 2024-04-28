import { Route, Routes, useNavigate } from 'react-router-dom';
import { Button, CssBaseline } from '@mui/material';
import { Toaster } from 'react-hot-toast';
import { HomePage, NotFound, ProfilePage, SignInPage, SignUpPage } from '../../pages';
import RestrictedRoute from '../RestrictedRoute';
import PrivateRoute from '../PrivateRoute';
import useRefreshUserQuery from '../../hooks/query/useRefreshUser.ts';

export default function App() {
  //useRefreshUserQuery();
  const navigate = useNavigate();

  return <>
    <Button onClick={() => navigate('/')}>Go home</Button>
    <Routes>
      <Route path={'/'}
             element={<HomePage />} />
      <Route path={'/sign-in'}
             element={<RestrictedRoute
               redirectTo={'/'}
               component={<SignInPage />} />} />
      <Route path={'/sign-up'}
             element={<RestrictedRoute
               redirectTo={'/'}
               component={<SignUpPage />} />} />
      <Route path={'/profile'}
             element={<PrivateRoute redirectTo={'/sign-in'}
                                    component={<ProfilePage />} />}>
      </Route>
      <Route path={'*'}
             element={<NotFound />} />
    </Routes>
    <CssBaseline />
    <Toaster position={'top-right'} />
  </>;
}
