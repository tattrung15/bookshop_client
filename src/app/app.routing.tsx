import { RouteGuardShape } from "@core/types/route.type";
import HomePage from "./pages/home";
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
];
