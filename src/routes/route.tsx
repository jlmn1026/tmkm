import MainLayout from '@/common-ui/layout/MainLayout';
import TopPage from '@/pages/TopPage';
import { Spin } from 'antd';
import { Suspense } from 'react';
import { Outlet, useRoutes } from 'react-router-dom';

const BaseLayout = () => {
  return (
    <MainLayout>
      <Suspense
        fallback={
          <div>
            <Spin size="large" />
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </MainLayout>
  );
};

export const AppRoutes = () => {
  // const auth = useAuth();

  const publicRoutes = [
    {
      path: '/',
      element: <BaseLayout />,
      children: [{ path: '/', element: <TopPage /> }],
    },
  ];

  // const protectedRoutes = [
  //   {
  //     path: '/app',
  //     element: <App />,
  //     children: [
  //       { path: '/discussions/*', element: <DiscussionsRoutes /> },
  //       { path: '/users', element: <Users /> },
  //     ],
  //   },
  // ];

  const element = useRoutes([...publicRoutes]);

  return <>{element}</>;
};
