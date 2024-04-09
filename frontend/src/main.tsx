import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthStatusProvider } from './providers';
import App from './components/App/App.tsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

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
