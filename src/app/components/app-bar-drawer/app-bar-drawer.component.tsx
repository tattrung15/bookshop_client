import React, { useState } from "react";
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
import { Link } from "react-router-dom";
import clsx from "clsx";
import { useStyles } from "./make-style";
import { mainListItems } from "./app-bar-drawer.list-item";

function AppBarDrawer() {
  const classes = useStyles();

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
    // auth.logout();
    // setUserState({
    //   userId: null,
    //   username: null,
    //   token: null,
    //   isAdmin: null,
    // });
    // history.push("/");
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
      <Link to="profile" style={{ textDecoration: "none", color: "black" }}>
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      </Link>
      <MenuItem onClick={handleLogout}>Log out</MenuItem>
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
            {/* <Chip
              style={{ cursor: "pointer" }}
              label={userState.username}
              avatar={
                <Avatar>
                  {userState.username &&
                    userState.username.substring(0, 1).toUpperCase()}
                </Avatar>
              }
            /> */}
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
        <List>{mainListItems}</List>
        {/* <Divider />
        <List>{secondaryListItems}</List> */}
      </Drawer>
    </>
  );
}

export default AppBarDrawer;
