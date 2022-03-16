import { Link } from "react-router-dom";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Icon,
  ListSubheader,
  Tooltip,
} from "@material-ui/core";
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Assignment as AssignmentIcon,
  Receipt as ReceiptIcon,
} from "@material-ui/icons";

export const mainListItems = (
  <div>
    <Link to="/" style={{ color: "black", textDecoration: "none" }}>
      <Tooltip title="Home" placement="right" arrow>
        <ListItem button>
          <ListItemIcon>
            <Icon className="fa fa-home" />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
      </Tooltip>
    </Link>
    <Link to="/admin" style={{ color: "black", textDecoration: "none" }}>
      <Tooltip title="Dashboard" placement="right" arrow>
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
      </Tooltip>
    </Link>
    <Link to="/admin/users" style={{ color: "black", textDecoration: "none" }}>
      <Tooltip title="User management" placement="right" arrow>
        <ListItem button>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>
      </Tooltip>
    </Link>
    <Link
      to="/admin/categories"
      style={{ color: "black", textDecoration: "none" }}
    >
      <Tooltip title="Category management" placement="right" arrow>
        <ListItem button>
          <ListItemIcon>
            <Icon className="fa fa-list-alt" />
          </ListItemIcon>
          <ListItemText primary="Categories" />
        </ListItem>
      </Tooltip>
    </Link>
    <Link
      to="/admin/products"
      style={{ color: "black", textDecoration: "none" }}
    >
      <Tooltip title="Book management" placement="right" arrow>
        <ListItem button>
          <ListItemIcon>
            <Icon className="fa fa-book" />
          </ListItemIcon>
          <ListItemText primary="Products" />
        </ListItem>
      </Tooltip>
    </Link>
    <Link
      to="/admin/product-images"
      style={{ color: "black", textDecoration: "none" }}
    >
      <Tooltip title="Images management" placement="right" arrow>
        <ListItem button>
          <ListItemIcon>
            <Icon className="fa fa-image" />
          </ListItemIcon>
          <ListItemText primary="Products Images" />
        </ListItem>
      </Tooltip>
    </Link>
    <Link
      to="/admin/sale-orders"
      style={{ color: "black", textDecoration: "none" }}
    >
      <Tooltip title="Sale orders management" placement="right" arrow>
        <ListItem button>
          <ListItemIcon>
            <ReceiptIcon />
          </ListItemIcon>
          <ListItemText primary="Sale orders" />
        </ListItem>
      </Tooltip>
    </Link>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
);
