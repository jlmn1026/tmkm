import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router } from 'react-router-dom';

import { Button } from '@/components/Elements';
import { Notifications } from '@/components/Notifications/Notifications';
import { AuthProvider } from '@/lib/auth';

const ErrorFallback = () => {
  return (
    <div role="alert">
      <h2 className="text-lg font-semibold">Ooops, something went wrong :( </h2>
      <Button className="mt-4" onClick={() => window.location.assign(window.location.origin)}>
        Refresh
      </Button>
    </div>
  );
};

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense
      fallback={
        <div>
          {/* TODO: icon */}
          Loading...
        </div>
      }
    >
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <HelmetProvider>
          {/* TODO: jotai */}
          <Notifications />
          <AuthProvider>
            <Router>{children}</Router>
          </AuthProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};
