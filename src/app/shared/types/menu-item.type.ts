import React from "react";

export interface MenuItem {
  linkTo: string;
  tooltip: string;
  mainContent: string;
  icon: React.ComponentType<any>;
}
