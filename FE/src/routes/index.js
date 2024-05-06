import RoutesConfig from './config/routes';
//HOC
import withAuth from '../HOC/withAuth';
import withAdmin from '../HOC/withAdmin';
//Auth
import SignIn from '../pages/auth/SignIn';
import SignUp from '../pages/auth/SignUp';
import ResetPassword from '../pages/auth/ResetPassword';
import Page404 from '../pages/auth/Page404';
import NewPassword from '../pages/auth/NewPassword';
import Home from '../pages/home/Home';
import UserProfile from '../pages/user/UserProfile';
//Layout
import { HeaderOnly } from '../components/layouts/index';
import { ContentOnly } from '../components/layouts/index';
import { Admin } from '../components/layouts/index';
//product
import ProductHome from '../pages/product/ProductHome';
import ProductSearch from '../pages/product/ProductSearch';
import ProductRoom from '../pages/product/ProductRoom';
import ProductInfo from '../pages/product/ProductInfo';
//Order
import Purchase from '../pages/Order/Purchase';
import Order from '../pages/Order/Order';
//admin
import ProductManager from '../pages/admin/ProductManager';
import UserManager from '../pages/admin/UserManager';
import OrderManager from '../pages/admin/OrderManager';
import TypeManager from '../pages/admin/TypeManager';
import CategoryManager from '../pages/admin/CategoryManager';
import PurchaseVNPay from '../pages/Order/PurchaseVNPay';

//public router
const publicRouter = [
  { path: RoutesConfig.home, component: Home },
  //auth
  { path: '/sign-in', component: SignIn, layout: HeaderOnly },
  { path: '/sign-up', component: SignUp, layout: HeaderOnly },
  { path: '/reset-password', component: ResetPassword, layout: HeaderOnly },
  { path: '/404', component: Page404, layout: HeaderOnly },
  { path: '/new-password/:token', component: NewPassword, layout: HeaderOnly },
  { path: '/profile', component: withAuth(UserProfile), layout: HeaderOnly },
  //product
  { path: '/products/category', component: ProductRoom },
  { path: '/products/search', component: ProductSearch },
  { path: RoutesConfig.products, component: ProductHome },
  { path: RoutesConfig.productInfo, component: ProductInfo },
  { path: RoutesConfig.purchase, component: withAuth(Purchase), layout: ContentOnly },
  { path: '/products/order/purchaseInfo', component: withAuth(PurchaseVNPay), layout: ContentOnly },
  { path: '/products/order', component: withAuth(Order), layout: HeaderOnly },
  //admin
  { path: '/admin/product', component: withAuth(withAdmin(ProductManager)), layout: Admin },
  { path: '/admin/user', component: withAuth(withAdmin(UserManager)), layout: Admin },
  { path: '/admin/order', component: withAuth(withAdmin(OrderManager)), layout: Admin },
  { path: '/admin/type', component: withAuth(withAdmin(TypeManager)), layout: Admin },
  { path: '/admin/category', component: withAuth(withAdmin(CategoryManager)), layout: Admin },
];

const privateRouter = [];

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
