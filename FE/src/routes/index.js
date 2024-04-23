//HOC
import withAuth from '../HOC/withAuth';
//Auth
import SignIn from '../pages/auth/SignIn';
import SignUp from '../pages/auth/SignUp';
import ResetPassword from '../pages/auth/ResetPassword';
import Page404 from '../pages/auth/Page404';
import NewPassword from '../pages/auth/NewPassword';
import Home from '../pages/home/Home';
import ProductInfo from '../pages/product/ProductInfo';
//Layout
import { HeaderOnly } from '../components/layouts/index';
import AuthenComponent from '../HOC/withAuth';

//public router
const publicRouter = [
  { path: '/', component: Home },
  { path: '/productinfo', component: ProductInfo },
  //auth
  { path: '/sign-in', component: SignIn, layout: HeaderOnly },
  { path: '/sign-up', component: SignUp, layout: HeaderOnly },
  { path: '/reset-password', component: ResetPassword, layout: HeaderOnly },
  { path: '/404', component: Page404, layout: HeaderOnly },
  { path: '/new-password/:token', component: NewPassword, layout: HeaderOnly },
];

const privateRouter = {};

const authRoutes = {
  path: '/auth',
  name: 'Auth',
  badgeColor: 'secondary',
  badgeText: 'Special',
  children: [
    {
      path: '/sign-in',
      name: 'Sign In',
      component: SignIn,
    },
    {
      path: '/sign-up',
      name: 'Sign Up',
      component: SignUp,
    },
    {
      path: '/reset-password',
      name: 'Reset Password',
      component: ResetPassword,
    },
    {
      path: '/new-password/:token',
      name: 'New Password',
      component: NewPassword,
    },
    {
      path: '/404',
      name: '404 Page',
      component: Page404,
    },
  ],
};

// Auth specific routes
export { authRoutes, publicRouter, privateRouter };
