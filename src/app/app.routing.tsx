import { RouteGuardShape } from "@core/types/route.type";
import { Role } from "./shared/types/user.type";
import HomePage from "./pages/home";
import CategoryList from "./pages/category-list";
import ProductList from "./pages/product-list";
import ProductViewed from "./pages/product-viewed";
import ProductDetail from "./pages/product-detail";
import Profile from "./pages/profile";
import Dashboard from "./pages/admin/dashboard";
import CartInfo from "./pages/cart-info";
import Checkout from "./pages/checkout";

export const routes: RouteGuardShape[] = [
  {
    path: "/",
    component: HomePage,
    config: {
      roles: [Role.GUEST, Role.ADMIN, Role.MEMBER],
      redirect: "/login",
    },
  },
  {
    path: "/categories",
    component: CategoryList,
    config: {
      roles: [Role.GUEST, Role.ADMIN, Role.MEMBER],
      redirect: "/",
    },
  },
  {
    path: "/products",
    component: ProductList,
    config: {
      roles: [Role.GUEST, Role.ADMIN, Role.MEMBER],
      redirect: "/",
    },
  },
  {
    path: "/products-viewed",
    component: ProductViewed,
    config: {
      roles: [Role.GUEST, Role.ADMIN, Role.MEMBER],
      redirect: "/",
    },
  },
  {
    path: "/products/:slug",
    component: ProductDetail,
    config: {
      roles: [Role.GUEST, Role.ADMIN, Role.MEMBER],
      redirect: "/",
    },
  },
  {
    path: "/profile/*",
    component: Profile,
    config: {
      roles: [Role.ADMIN, Role.MEMBER],
      redirect: "/",
    },
  },
  {
    path: "/admin/*",
    component: Dashboard,
    config: {
      roles: [Role.ADMIN],
      redirect: "/",
    },
  },
  {
    path: "/cart",
    component: CartInfo,
    config: {
      roles: [Role.MEMBER],
      redirect: "/",
    },
  },
  {
    path: "/checkout",
    component: Checkout,
    config: {
      roles: [Role.MEMBER],
      redirect: "/",
    },
  },
];
