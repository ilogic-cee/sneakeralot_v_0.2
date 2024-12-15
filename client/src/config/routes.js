import { lazy } from 'react';

// Lazy load pages for better performance
const Home = lazy(() => import('../pages/Home'));
const Products = lazy(() => import('../pages/Products'));
const ProductDetail = lazy(() => import('../pages/ProductDetail'));
const Cart = lazy(() => import('../pages/Cart'));
const Checkout = lazy(() => import('../pages/Checkout'));
const Account = lazy(() => import('../pages/Account'));

export const routes = [
  {
    path: '/',
    component: Home,
    exact: true,
  },
  {
    path: '/products',
    component: Products,
    exact: true,
  },
  {
    path: '/products/:id',
    component: ProductDetail,
  },
  {
    path: '/cart',
    component: Cart,
  },
  {
    path: '/checkout',
    component: Checkout,
    protected: true,
  },
  {
    path: '/account',
    component: Account,
    protected: true,
  },
];

// Helper function to get route by path
export const getRouteByPath = (path) => {
  return routes.find((route) => route.path === path);
}; 