import React from 'react';
import ReactDOM from 'react-dom/client';
import { CssBaseline } from '@mui/material';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import HomePage from './pages/HomePage.tsx';
import NotFound from './pages/NotFound.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <CssBaseline />
  </React.StrictMode>,
);
