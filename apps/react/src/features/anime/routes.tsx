import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import { AuthGuard } from '../../routes/authGuard';

const AnimePage = lazy(() =>
  import('./pages/animePage').then(module => ({ default: module.AnimePage })));

export const AnimeRoutes: RouteObject[] = [
  {
    element: <AuthGuard />,
    children: [
      {
        path: 'anime',
        element: <AnimePage />,
      },
    ],
  },
];
