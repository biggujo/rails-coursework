import { Route, Routes } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import HomePage from '../../pages/HomePage.tsx';
import NotFound from '../../pages/NotFound.tsx';
import SignInPage from '../../pages/SignInPage.tsx';
import { Toaster } from 'react-hot-toast';

export default function App() {
  return (<>
    <Routes>
      <Route path={'/'} element={<HomePage />} />
      <Route path={'/sign-in'} element={<SignInPage />} />
      <Route path={'*'} element={<NotFound />} />
    </Routes>
    <CssBaseline />
    <Toaster position={'top-right'} />
  </>);
}
