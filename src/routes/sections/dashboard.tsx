import type { RouteObject } from 'react-router';

import { Outlet } from 'react-router';
import { lazy, Suspense } from 'react';

import { CONFIG } from 'src/global-config';
import { DashboardLayout } from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

import { AuthGuard } from 'src/auth/guard';

import { usePathname } from '../hooks';

// ----------------------------------------------------------------------

const IndexPage = lazy(() => import('src/pages/dashboard/dashboard'));
const ProductListPage = lazy(() => import('src/pages/product/list'));
const ProductDetailPage = lazy(() => import('src/pages/product/detail'));
const ProductCheckoutPage = lazy(() => import('src/pages/product/checkout'));
const OrderListPage = lazy(() => import('src/pages/order/list'));
const OrderDetailPage = lazy(() => import('src/pages/order/detail'));
const ProductListManagePage = lazy(() => import('src/pages/product/list-manage'));
const ProductNewPage = lazy(() => import('src/pages/product/new'));
const ProductEditPage = lazy(() => import('src/pages/product/edit'));

// ----------------------------------------------------------------------

function SuspenseOutlet() {
  const pathname = usePathname();
  return (
    <Suspense key={pathname} fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  );
}

const dashboardLayout = () => (
  <DashboardLayout>
    <SuspenseOutlet />
  </DashboardLayout>
);

export const dashboardRoutes: RouteObject[] = [
  {
    path: 'dashboard',
    element: CONFIG.auth.skip ? dashboardLayout() : <AuthGuard>{dashboardLayout()}</AuthGuard>,
    children: [{ element: <IndexPage />, index: true }],
  },
  {
    path: 'product',
    element: CONFIG.auth.skip ? dashboardLayout() : <AuthGuard>{dashboardLayout()}</AuthGuard>,
    children: [
      { index: true, element: <ProductListPage /> },
      {
        path: 'list',
        children: [
          { element: <ProductListPage />, index: true },
          { path: 'manage', element: <ProductListManagePage /> },
        ],
      },
      { path: 'new', element: <ProductNewPage /> },
      { path: 'detail/:id', element: <ProductDetailPage /> },
      { path: 'edit/:id', element: <ProductEditPage /> },
      { path: 'checkout', element: <ProductCheckoutPage /> },
      {
        path: 'order',
        children: [
          { element: <OrderListPage />, index: true },
          { path: 'detail/:id', element: <OrderDetailPage /> },
          { path: 'list', element: <OrderListPage /> },
        ],
      },
    ],
  },
];
