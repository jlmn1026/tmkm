import MainLayout from '@/common-ui/layout/MainLayout';
import TopPage from '@/pages/TopPage';
import { Spin } from 'antd';
import { Suspense } from 'react';
import { Outlet, useRoutes } from 'react-router-dom';
import { PageRoute } from './pageRoute';
import CreateCardPage from '@/pages/CreateCardPage';
import CardListPage from '@/pages/CardListPage';
import CreateDeckPage from '@/pages/CreateDeckPage';
import EditDeckPage from '@/pages/EditDeckPage';
import StudyPage from '@/pages/StudyPage';

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
      children: [{ path: PageRoute.CreateDeck, element: <CreateDeckPage /> }],
    },
    {
      path: '/',
      element: <BaseLayout />,
      children: [{ path: `${PageRoute.EditDeck}/:deckId`, element: <EditDeckPage /> }],
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
      // TODO: top pageという名前はやめる
      children: [{ path: PageRoute.Study, element: <TopPage /> }],
    },
    {
      path: '/',
      element: <BaseLayout />,
      children: [{ path: `${PageRoute.Study}/:deckId`, element: <StudyPage /> }],
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
