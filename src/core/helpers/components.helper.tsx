import React from "react";
import { Navigate, Route } from "react-router-dom";
import {
  RouteGuardConfig,
  RouteGuardShape,
  RouteShape,
} from "@core/types/route.type";

const groupRoutes = (routes: RouteShape[] = []): React.ReactNode[] => {
  return routes.map((route, i) => {
    const Component = route.component as React.ComponentType<any>;
    if (route.guardResult?.isAllow) {
      return <Route key={i} path={route.path} element={<Component />} />;
    }
    return (
      <Route
        key={i}
        path={route.path}
        element={<Navigate to={route.guardResult?.redirect || ""} replace />}
      />
    );
  });
};

export const guardRoutes = (
  routes: RouteGuardShape[],
  role: string,
  config?: RouteGuardConfig
) => {
  const guardedRoutes = routes.map((route) => {
    let isAllow = true;
    let redirect = "/login";

    if (config) {
      isAllow = config.roles.includes(role);
      redirect = config.redirect;
    }

    if (route.config) {
      isAllow = route.config.roles.includes(role);
      redirect = route.config.redirect;
    }

    return {
      ...route,
      guardResult: {
        isAllow,
        redirect,
      },
    };
  });

  return groupRoutes(guardedRoutes);
};
