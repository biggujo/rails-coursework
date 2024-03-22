import { Route, Routes, useNavigate } from 'react-router-dom';
import { Button, CssBaseline } from '@mui/material';
import HomePage from '../../pages/HomePage.tsx';
import NotFound from '../../pages/NotFound.tsx';
import SignInPage from '../../pages/SignInPage.tsx';
import { Toaster } from 'react-hot-toast';
import ProfilePage from '../../pages/ProfilePage.tsx';
import SignUpPage from '../../pages/SignUpPage.tsx';

export default function App() {
  const navigate = useNavigate();

  return (<>
    <Button onClick={() => navigate('/')}>Go home</Button>
    <Routes>
      <Route path={'/'} element={<HomePage />} />
      <Route path={'/sign-in'} element={<SignInPage />} />
      <Route path={'/sign-up'} element={<SignUpPage />} />
      <Route path={'/profile'} element={<ProfilePage />} />
      <Route path={'*'} element={<NotFound />} />
    </Routes>
    <CssBaseline />
    <Toaster position={'top-right'} />
  </>);
}
