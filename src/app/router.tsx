import { createBrowserRouter } from 'react-router-dom';

import { LOGIN_URL } from '@/shared/config';
import { LogoutPage, ConfirmPage } from '@/pages';
import { DashboardPage } from '@/pages/DashboardPage';
import { CompetitionTestPage } from '@/pages/competition/CompetitionTestPage';
import { RegistrationTestPage } from '@/pages/registration/RegistrationTestPage';
import { useEffect } from 'react';

const LoginRedirect = () => {
  useEffect(() => {
    window.location.href = LOGIN_URL;
  }, []);
  return null;
};

/**
 * 애플리케이션 라우트 설정
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardPage />,
  },
  {
    path: '/competition',
    element: <CompetitionTestPage />,
  },
  {
    path: '/registration',
    element: <RegistrationTestPage />,
  },
  {
    path: '/login',
    element: <LoginRedirect />,
  },
  {
    path: '/confirm',
    element: <ConfirmPage />,
  },
  {
    path: '/logout',
    element: <LogoutPage />,
  },

]);