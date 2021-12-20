import React from "react";

export interface RouteShape {
  path: string | string[];
  component: React.ComponentType;
  guardResult?: RouteGuardResult;
}

export interface RouteGuardResult {
  isAllow?: boolean;
  redirect?: string;
}
