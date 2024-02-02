import { lazy } from 'react';
const OrderReq = lazy(() => import('../pages/Orders/OrderReq'));
const Variations = lazy(() => import('../pages/Variations/Variations'));
const VariationOptions = lazy(
  () => import('../pages/VariationOptions/VariationOptions'),
);
const Products = lazy(() => import('../pages/products/products'));
const ProductItemForm = lazy(
  () => import('../pages/product-items/ProductItemForm'),
);
const Users = lazy(() => import('../pages/Users/Users'));
const UserForm = lazy(() => import('../pages/Users/UserForm'));
const Product = lazy(() => import('../pages/products/product'));
const Promotions = lazy(() => import('../pages/Promotion/Promotions'));
const Orders = lazy(() => import('../pages/Orders/Orders'));
const OrderItem = lazy(() => import('../pages/Orders/OrderItem'));

const ProductReq = lazy(() => import('../pages/products/productReq'));
const ProductItemReq = lazy(
  () => import('../pages/product-items/ProductItemReq'),
);
const PromotionReq = lazy(() => import('../pages/Promotion/PromotionReq'));
const Blogs = lazy(() => import('../pages/Blog/Blogs'));
const BlogReq = lazy(() => import('../pages/Blog/BlogReq'));
const Blog = lazy(() => import('../pages/Blog/Blog'));
const Test = lazy(() => import('../pages/Test'));
const Calendar = lazy(() => import('../pages/Calendar'));
const Chart = lazy(() => import('../pages/Chart'));
const FormElements = lazy(() => import('../pages/Form/FormElements'));
const FormLayout = lazy(() => import('../pages/Form/FormLayout'));
const Profile = lazy(() => import('../pages/Profile'));
const Settings = lazy(() => import('../pages/Settings'));
const Tables = lazy(() => import('../pages/Tables'));
const Alerts = lazy(() => import('../pages/UiElements/Alerts'));
const Buttons = lazy(() => import('../pages/UiElements/Buttons'));
const Categories = lazy(() => import('../pages/Categories/Categories'));

const coreRoutes = [
  {
    path: '/calendar',
    title: 'Calender',
    component: Calendar,
  },
  {
    path: '/profile',
    title: 'Profile',
    component: Profile,
  },
  {
    path: '/test',
    title: 'Profile',
    component: Test,
  },
  {
    path: '/categories',
    title: 'forms category',
    component: Categories,
  },
  {
    path: '/categories/:id',
    title: 'forms category',
    component: Categories,
  },
  {
    path: '/blogs',
    title: 'forms category',
    component: Blogs,
  },
  {
    path: '/blogs/list/:id',
    title: 'forms category',
    component: Blog,
  },
  {
    path: '/blogs/create',
    title: 'forms category',
    component: BlogReq,
  },
  {
    path: '/blogs/edit/:id',
    title: 'forms category',
    component: BlogReq,
  },
  {
    path: '/categories/:id/variations',
    title: 'forms category',
    component: Variations,
  },
  {
    path: '/categories/:id/variations/:variation_id',
    title: 'forms category',
    component: Variations,
  },
  {
    path: '/categories/:id/variations/:variation_id/options',
    title: 'forms category',
    component: VariationOptions,
  },
  {
    path: '/categories/:id/variations/:variation_id/options/:option_id',
    title: 'forms category',
    component: VariationOptions,
  },
  {
    path: '/products',
    title: 'forms category',
    component: Products,
  },
  {
    path: '/products/create',
    title: 'forms category',
    component: ProductReq,
  },
  {
    path: '/products/edit/:id',
    title: 'forms category',
    component: ProductReq,
  },
  // {
  //   path: '/products/:id',
  //   title: 'forms category',
  //   component: ProductItems,
  // },
  {
    path: '/products/:id/product_items/create',
    title: 'forms category',
    component: ProductItemForm,
  },
  {
    path: '/products/:id/product_items/edit/:product_item_id',
    title: 'forms category',
    component: ProductItemReq,
  },
  {
    path: '/products/edit/:id',
    title: 'forms category',
    component: ProductItemReq,
  },
  {
    path: '/products/:id',
    title: 'forms category',
    component: Product,
  },
  {
    path: '/users',
    title: 'forms category',
    component: Users,
  },
  {
    path: '/users/create',
    title: 'forms category',
    component: UserForm,
  },
  {
    path: '/users/edit',
    title: 'forms category',
    component: UserForm,
  },
  {
    path: '/categories/promotions/list/:id',
    title: 'forms category',
    component: Promotions,
  },
  {
    path: '/categories/promotions/create',
    title: 'forms category',
    component: PromotionReq,
  },
  {
    path: '/categories/promotions/edit/:id',
    title: 'forms category',
    component: PromotionReq,
  },
  {
    path: '/orders',
    title: 'forms category',
    component: Orders,
  },
  {
    path: '/orders/:id',
    title: 'forms category',
    component: OrderReq,
  },
  {
    path: '/orders/item/:id',
    title: 'forms category',
    component: OrderItem,
  },
  {
    path: '/forms/form-elements',
    title: 'Forms Elements',
    component: FormElements,
  },

  {
    path: '/forms/form-layout',
    title: 'Form Layouts',
    component: FormLayout,
  },
  {
    path: '/tables',
    title: 'Tables',
    component: Tables,
  },
  {
    path: '/settings',
    title: 'Settings',
    component: Settings,
  },
  {
    path: '/chart',
    title: 'Chart',
    component: Chart,
  },
  {
    path: '/ui/alerts',
    title: 'Alerts',
    component: Alerts,
  },
  {
    path: '/ui/buttons',
    title: 'Buttons',
    component: Buttons,
  },
];

const routes = [...coreRoutes];
export default routes;
