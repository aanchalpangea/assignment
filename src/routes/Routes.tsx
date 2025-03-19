import { RouteObject } from 'react-router-dom';
import { ROUTES } from './routePaths';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';
import Home from '../pages/home/Home';

// Import your page components here
// import LoginPage from '../pages/auth/LoginPage';
// import DashboardPage from '../pages/dashboard/DashboardPage';
// etc...

const Routes: RouteObject[] = [
  {
    element: <PublicRoutes />,
    children: [
      {
        path: ROUTES.HOME,
        element: <Home />,
      },
      {
        path: ROUTES.LOGIN,
        // element: <LoginPage />,
      },
      {
        path: ROUTES.REGISTER,
        // element: <RegisterPage />,
      },
      {
        path: ROUTES.FORGOT_PASSWORD,
        // element: <ForgotPasswordPage />,
      },
    ],
  },
  {
    element: <PrivateRoutes />,
    children: [
      {
        path: ROUTES.HOME,
        // element: <HomePage />,
      },
      {
        path: ROUTES.DASHBOARD,
        // element: <DashboardPage />,
      },
      {
        path: ROUTES.PROFILE,
        // element: <ProfilePage />,
      },
      {
        path: ROUTES.SETTINGS,
        // element: <SettingsPage />,
      },
    ],
  },
];

export default Routes;
