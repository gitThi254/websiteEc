import { lazy } from "react";
const BlogDetails = lazy(() => import("../pages/Blog/BlogDetails"));
const Profile = lazy(() => import("../pages/Profile"));
const About = lazy(() => import("../pages/About"));
const Blog = lazy(() => import("../pages/Blog"));
const Cart = lazy(() => import("../pages/Cart"));
const Contact = lazy(() => import("../pages/Contact"));
const Order = lazy(() => import("../pages/Order"));
const ProductDetail = lazy(() => import("../pages/ProductDetail"));
const ProductList = lazy(() => import("../pages/ProductList"));

const coreRoutes = [
  {
    path: "/products",
    title: "ProductList",
    component: ProductList,
  },
  {
    path: "/products/:id",
    title: "Product Detail",
    component: ProductDetail,
  },
  {
    path: "/profile",
    title: "Product Detail",
    component: Profile,
  },
  {
    path: "/contact",
    title: "Contact",
    component: Contact,
  },
  {
    path: "/blog",
    title: "blog",
    component: Blog,
  },
  {
    path: "/blog/:id",
    title: "blog",
    component: BlogDetails,
  },
  {
    path: "/about",
    title: "About",
    component: About,
  },
  {
    path: "/cart",
    title: "cart",
    component: Cart,
  },
  {
    path: "/order",
    title: "Order",
    component: Order,
  },
  {
    path: "/order/history",
    title: "HistoryOrder",
    component: Profile,
  },
];

const routes = [...coreRoutes];
export default routes;
