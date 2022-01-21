import { RouteGuardShape } from "@core/types/route.type";
import HomePage from "./pages/home";
import SignIn from "./pages/sign-in";

export const routes: RouteGuardShape[] = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/login",
    component: SignIn,
  },
];
