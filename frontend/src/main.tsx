import React from 'react';
import ReactDOM from 'react-dom/client';
import { CssBaseline } from '@mui/material';
import { BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import HomePage from './pages/HomePage.tsx';
import NotFound from './pages/NotFound.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthStatusProvider } from './providers';
import App from './components/App/App.tsx';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthStatusProvider>
          <App />
        </AuthStatusProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
