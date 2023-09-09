import TopPage from '@/pages/TopPage';
import { useRoutes } from 'react-router-dom';

export const AppRoutes = () => {
  // const auth = useAuth();

  const publicRoutes = [{ path: '/', element: <TopPage /> }];

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
