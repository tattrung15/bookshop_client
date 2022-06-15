import { Route, Routes } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import AppBarDrawer from "@app/components/app-bar-drawer";
import { useStyles } from "./make-style";
import NotFound from "@app/pages/not-found";
import { guardRoutes } from "@core/helpers/components.helper";
import { Role } from "@app/shared/types/user.type";
import { routes } from "../admin.routing";
import RoleService from "@app/services/role.service";

function Dashboard() {
  const classes = useStyles();

  const role = RoleService.getRole();

  return (
    <>
      <Helmet>
        <title>Admin</title>
      </Helmet>
      <div className={classes.root}>
        <AppBarDrawer />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Routes>
            {guardRoutes(routes, role, {
              roles: [Role.ADMIN],
              redirect: "/",
            })}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default Dashboard;
