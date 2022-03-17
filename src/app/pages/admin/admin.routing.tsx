import { Role } from "@app/shared/types/user.type";
import { RouteGuardShape } from "@core/types/route.type";
import RecentOrderManagement from "./recent-order-management";

export const routes: RouteGuardShape[] = [
  {
    path: "/",
    component: RecentOrderManagement,
    config: {
      roles: [Role.ADMIN],
      redirect: "/login",
    },
  },
];
