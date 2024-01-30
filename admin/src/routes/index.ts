import { lazy } from 'react';
const OrderReq = lazy(() => import('../pages/Orders/OrderReq'));
const Variations = lazy(() => import('../pages/Variations/Variations'));
const VariationOptions = lazy(
  () => import('../pages/VariationOptions/VariationOptions'),
);
const VariationOptionForm = lazy(
  () => import('../pages/VariationOptions/VariationOptionForm'),
);
const Products = lazy(() => import('../pages/products/products'));
const ProductItemForm = lazy(
  () => import('../pages/product-items/ProductItemForm'),
);
const ProductItems = lazy(() => import('../pages/product-items/ProductItems'));
const Users = lazy(() => import('../pages/Users/Users'));
const UserForm = lazy(() => import('../pages/Users/UserForm'));
const Product = lazy(() => import('../pages/products/product'));
const Promotions = lazy(() => import('../pages/Promotion/Promotions'));
const Orders = lazy(() => import('../pages/Orders/Orders'));
const OrderItem = lazy(() => import('../pages/Orders/OrderItem'));
const CategoriesReq = lazy(() => import('../pages/Categories/CategoriesReq'));
const VariationReq = lazy(() => import('../pages/Variations/VariationReq'));
const VariationOptionReq = lazy(
  () => import('../pages/VariationOptions/VariationOptionReq'),
);
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
const CategoryForm = lazy(() => import('../pages/Categories/CategoryForm'));

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
    path: '/categories/list',
    title: 'forms category',
    component: Categories,
  },
  {
    path: '/categories/create',
    title: 'forms category',
    component: CategoryForm,
  },
  {
    path: '/categories/edit/:id',
    title: 'forms category',
    component: CategoriesReq,
  },
  {
    path: '/blogs/list',
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
    path: '/variations/list',
    title: 'forms category',
    component: Variations,
  },
  {
    path: '/variations/create',
    title: 'forms category',
    component: VariationReq,
  },
  {
    path: '/variations/edit/:id',
    title: 'forms category',
    component: VariationReq,
  },
  {
    path: '/variations/option/list/:id',
    title: 'forms category',
    component: VariationOptions,
  },
  {
    path: '/variations/option/create/:id',
    title: 'forms category',
    component: VariationOptionForm,
  },
  {
    path: '/variations/option/edit/:id',
    title: 'forms category',
    component: VariationOptionReq,
  },
  {
    path: '/products/list',
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
  {
    path: '/products/item/list/:id',
    title: 'forms category',
    component: ProductItems,
  },
  {
    path: '/products/item/create/:id',
    title: 'forms category',
    component: ProductItemForm,
  },
  {
    path: '/products/item/:id',
    title: 'forms category',
    component: ProductItemForm,
  },
  {
    path: '/products/item/edit/:id',
    title: 'forms category',
    component: ProductItemReq,
  },
  {
    path: '/products/list/:id',
    title: 'forms category',
    component: Product,
  },
  {
    path: '/users/list',
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
    path: '/orders/list',
    title: 'forms category',
    component: Orders,
  },
  {
    path: '/orders/list/:id',
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
