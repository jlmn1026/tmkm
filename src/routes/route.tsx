import MainLayout from '@/common-ui/layout/MainLayout';
import TopPage from '@/pages/TopPage';
import { Spin } from 'antd';
import { Suspense } from 'react';
import { Outlet, useRoutes } from 'react-router-dom';
import { PageRoute } from './pageRoute';
import CreateCardPage from '@/pages/CreateCardPage';
import CardListPage from '@/pages/CardListPage';

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
      children: [{ path: PageRoute.Top, element: <TopPage /> }],
    },
    {
      path: '/',
      element: <BaseLayout />,
      children: [{ path: PageRoute.CreateDeck, element: <TopPage /> }],
    },
    {
      path: '/',
      element: <BaseLayout />,
      children: [{ path: PageRoute.CreateCard, element: <CreateCardPage /> }],
    },
    {
      path: '/',
      element: <BaseLayout />,
      children: [{ path: PageRoute.CardList, element: <CardListPage /> }],
    },
    {
      path: '/',
      element: <BaseLayout />,
      children: [{ path: PageRoute.Study, element: <TopPage /> }],
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
