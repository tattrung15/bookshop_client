import { Role } from "@app/shared/types/user.type";
import { RouteGuardShape } from "@core/types/route.type";
import CategoryManagement from "./category-management";
import RecentOrderManagement from "./recent-order-management";
import UserManagement from "./user-management";

export const routes: RouteGuardShape[] = [
  {
    path: "/",
    component: RecentOrderManagement,
    config: {
      roles: [Role.ADMIN],
      redirect: "/",
    },
  },
  {
    path: "/user-management",
    component: UserManagement,
    config: {
      roles: [Role.ADMIN],
      redirect: "/",
    },
  },
  {
    path: "/category-management",
    component: CategoryManagement,
    config: {
      roles: [Role.ADMIN],
      redirect: "/",
    },
  },
];
