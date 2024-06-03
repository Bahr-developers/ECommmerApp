import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const LanguagePage = lazy(() => import('src/pages/language'));
export const TranslatePage = lazy(() => import('src/pages/translate'));
export const UserHomePage = lazy(() => import('src/pages/UserHome'));
export const UserSettingPage = lazy(() => import('src/pages/userSetting'));
export const CategoryPage = lazy(() => import('src/pages/Category'));

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'translate', element: <TranslatePage /> },
        { path: 'language', element: <LanguagePage /> },
        { path: 'users', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'profile', element: <UserHomePage /> },
        { path: 'setting', element: <UserSettingPage /> },
        { path: 'category', element: <CategoryPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
