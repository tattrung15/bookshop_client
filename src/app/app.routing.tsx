import { RouteGuardShape } from "@core/types/route.type";
import Dashboard from "./pages/admin/dashboard";
import HomePage from "./pages/home";
import Profile from "./pages/profile";
import { Role } from "./shared/types/user.type";

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
];
