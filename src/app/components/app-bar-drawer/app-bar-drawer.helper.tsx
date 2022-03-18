import { Link } from "react-router-dom";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@material-ui/core";
import { MenuItem } from "@app/shared/types/menu-item.type";

export const renderListItems = (listItems: MenuItem[]) => {
  return (
    <div>
      {!!listItems.length &&
        listItems.map((item: MenuItem, index: number) => {
          const Icon = item.icon;
          return (
            <Link
              key={index}
              to={item.linkTo}
              style={{ color: "black", textDecoration: "none" }}
            >
              <Tooltip title={item.tooltip} placement="right" arrow>
                <ListItem button>
                  <ListItemIcon>
                    <Icon />
                  </ListItemIcon>
                  <ListItemText primary={item.mainContent} />
                </ListItem>
              </Tooltip>
            </Link>
          );
        })}
    </div>
  );
};
