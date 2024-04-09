import { Route, Routes, useNavigate } from 'react-router-dom';
import { Button, CssBaseline } from '@mui/material';
import HomePage from '../../pages/HomePage.tsx';
import NotFound from '../../pages/NotFound.tsx';
import SignInPage from '../../pages/SignInPage.tsx';
import { Toaster } from 'react-hot-toast';
import ProfilePage from '../../pages/ProfilePage.tsx';
import SignUpPage from '../../pages/SignUpPage.tsx';
import RestrictedRoute from '../RestrictedRoute';
import PrivateRoute from '../PrivateRoute';

export default function App() {
  const navigate = useNavigate();

  return (<>
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
                                    component={<ProfilePage />} />} />
      <Route path={'*'}
             element={<NotFound />} />
    </Routes>
    <CssBaseline />
    <Toaster position={'top-right'} />
  </>);
}
