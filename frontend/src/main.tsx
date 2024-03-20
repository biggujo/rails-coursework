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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthStatusProvider } from './providers';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <NotFound />,
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthStatusProvider>
        <RouterProvider router={router} />
        <CssBaseline />
      </AuthStatusProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
