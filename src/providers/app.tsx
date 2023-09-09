import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { HashRouter as Router } from 'react-router-dom';

import { Button } from 'antd';

const ErrorFallback = () => {
  return (
    <div role="alert">
      <h2>Ooops, something went wrong :( </h2>
      <Button onClick={() => window.location.assign(window.location.origin)}>Refresh</Button>
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
          <Router>{children}</Router>
        </HelmetProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};
