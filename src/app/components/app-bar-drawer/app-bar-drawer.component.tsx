import React, { useState } from "react";
import clsx from "clsx";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  CssBaseline,
  Drawer,
  AppBar,
  Avatar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  Chip,
  Menu,
  MenuItem,
} from "@material-ui/core";
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
} from "@material-ui/icons";
import { useStyles } from "./make-style";
import { renderListItems } from "./app-bar-drawer.helper";
import { GlobalState } from "@app/store";
import StorageService from "@core/services/storage";
import { clearUser } from "@app/store/auth/auth.action";
import { mainMenuItems } from "@app/shared/constants/common";

function AppBarDrawer() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { username } = useSelector(selectAuth);

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.SyntheticEvent<any>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    dispatch(clearUser());
    StorageService.set("access_token", "");
    StorageService.set("role", "");
    StorageService.setSession("access_token", "");
    StorageService.setSession("role", "");
    navigate("/", { replace: true });
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Link to="/profile" style={{ textDecoration: "none", color: "black" }}>
        <MenuItem onClick={handleMenuClose}>Hồ sơ</MenuItem>
      </Link>
      <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
    </Menu>
  );

  return (
    <>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Dashboard
          </Typography>
          <IconButton
            color="inherit"
            disableRipple
            onClick={handleProfileMenuOpen}
          >
            <Chip
              style={{ cursor: "pointer" }}
              label={username}
              avatar={
                <Avatar>
                  {username && username.substring(0, 1).toUpperCase()}
                </Avatar>
              }
            />
          </IconButton>
        </Toolbar>
      </AppBar>
      {renderMenu}
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{renderListItems(mainMenuItems)}</List>
      </Drawer>
    </>
  );
}

const selectAuth = (state: GlobalState) => state.auth;

export default AppBarDrawer;
