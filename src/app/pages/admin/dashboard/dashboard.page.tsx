import { Route, Routes } from "react-router-dom";
import AppBarDrawer from "@app/components/app-bar-drawer";
import { useStyles } from "./make-style";
import NotFound from "@app/pages/not-found";
import { GlobalState } from "@app/store";
import { useSelector } from "react-redux";
import { guardRoutes } from "@core/helpers/components.helper";
import { Role } from "@app/shared/types/user.type";
import { routes } from "../admin.routing";

function Dashboard() {
  const classes = useStyles();

  const { role } = useSelector(selectAuth);

  return (
    <>
      <div className={classes.root}>
        <AppBarDrawer />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Routes>
            {guardRoutes(routes, role, {
              roles: [Role.ADMIN],
              redirect: "/login",
            })}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

const selectAuth = (state: GlobalState) => state.auth;

export default Dashboard;
