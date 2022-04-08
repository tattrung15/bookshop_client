import { RouteGuardShape } from "@core/types/route.type";
import { Role } from "./shared/types/user.type";
import Dashboard from "./pages/admin/dashboard";
import HomePage from "./pages/home";
import ProductDetail from "./pages/product-detail";
import Profile from "./pages/profile";
import CartInfo from "./pages/cart-info";

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
    path: "/products/:slug",
    component: ProductDetail,
    config: {
      roles: [Role.GUEST, Role.ADMIN, Role.MEMBER],
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
];
