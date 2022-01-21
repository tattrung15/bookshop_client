import React, { useState } from "react";
import {
  AppBar as AppBarMui,
  Avatar,
  Badge,
  Box,
  Chip,
  Icon,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  SwipeableDrawer,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  MoveToInbox as InboxIcon,
  Mail as MailIcon,
  Menu as MenuIcon,
  Search as SearchIcon,
  MoreVert as MoreIcon,
} from "@mui/icons-material";
import clsx from "clsx";

import { useStyles } from "./make-style";
import { Link } from "react-router-dom";
import { GlobalState } from "@app/store";
import { useDispatch, useSelector } from "react-redux";
import { Role } from "@app/shared/types/user.type";
import { clearUser } from "@app/store/auth/auth.action";
import StorageService from "@core/services/storage";

function AppBar() {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const [state, setState] = useState({ left: false });
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const authState = useSelector(selectAuth);
  const dispatch = useDispatch();

  const handleProfileMenuOpen = (event: React.SyntheticEvent<any>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.SyntheticEvent<any>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMenuLogout = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    dispatch(clearUser());
    StorageService.set("access_token", "");
    StorageService.setSession("access_token", "");
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
      {authState.role === Role.ADMIN && (
        <Link to="/admin" style={{ color: "black", textDecoration: "none" }}>
          <MenuItem onClick={handleMenuClose}>Dashboard</MenuItem>
        </Link>
      )}
      {authState.username && (
        <Box>
          <Link
            to="/profile"
            style={{ color: "black", textDecoration: "none" }}
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          </Link>

          <MenuItem onClick={handleMenuLogout}>Log out</MenuItem>
        </Box>
      )}
      {!authState.username && (
        <Link to="/login" style={{ color: "black", textDecoration: "none" }}>
          <MenuItem onClick={handleMenuClose}>Đăng nhập</MenuItem>
        </Link>
      )}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <Link to={"/cart"} style={{ color: "black", textDecoration: "none" }}>
        <MenuItem>
          {/* {!!authState.username && (
            <IconButton
              aria-label="show 4 new mails"
              color="inherit"
              disableRipple
              disableFocusRipple
            >
              <Badge
                badgeContent={cartState.numberOfProducts}
                color="secondary"
              >
                <Icon
                  style={{ overflow: "visible" }}
                  className="fa fa-shopping-cart"
                />
              </Badge>
            </IconButton>
          )} */}
          <p>Cart</p>
        </MenuItem>
      </Link>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          disableRipple
          disableTouchRipple
        >
          {authState.username && (
            <Box>
              <Avatar className={classes.small}>
                {authState.username.substring(0, 1).toUpperCase()}
              </Avatar>
            </Box>
          )}
          {!authState.username && <Icon className="fa fa-user" />}
        </IconButton>
        {!authState.username && <p>{authState.username}</p>}
        {!authState.username && <p>Đăng nhập</p>}
      </MenuItem>
    </Menu>
  );

  const list = (anchor: string) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem button>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText primary="Starred" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Send email" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText primary="Drafts" />
        </ListItem>
      </List>
    </div>
  );

  const toggleDrawer = (anchor: string, open: boolean) => (event: any) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <div className={classes.grow}>
      <AppBarMui position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer("left", true)}
          >
            <MenuIcon />
          </IconButton>
          <SwipeableDrawer
            anchor={"left"}
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
            onOpen={toggleDrawer("left", true)}
          >
            {list("left")}
          </SwipeableDrawer>
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            <Typography className={classes.title} variant="h6" noWrap>
              BOOKSHOP
            </Typography>
          </Link>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              className={classes.searchInput}
              inputProps={{ "aria-label": "search" }}
              // onKeyPress={(ev) => {
              //   if (ev.which === 13 || ev.keyCode === 13) {
              //     const strSearch = ev.target.value;
              //     ev.target.value = "";
              //     history.push({
              //       pathname: "/search",
              //       search: `?keyword=${strSearch}`,
              //     });
              //   }
              // }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {!!authState.id && (
              <Link
                to={"/cart"}
                style={{
                  color: "white",
                  textDecoration: "none",
                  marginTop: "5px",
                }}
              >
                <IconButton
                  aria-label="show 4 new mails"
                  color="inherit"
                  disableRipple
                  disableFocusRipple
                >
                  <Badge
                    // badgeContent={cartState.numberOfProducts}
                    color="secondary"
                  >
                    <Icon
                      style={{ overflow: "visible" }}
                      className="fa fa-shopping-cart"
                    />
                  </Badge>
                </IconButton>
              </Link>
            )}
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              disableRipple
              disableFocusRipple
            >
              {!!authState.username ? (
                <Chip
                  className={classes.chip}
                  label={authState.username}
                  avatar={
                    <Avatar>
                      {authState.username.substring(0, 1).toUpperCase()}
                    </Avatar>
                  }
                />
              ) : (
                <Icon className="fa fa-user" />
              )}
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBarMui>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}

const selectAuth = (state: GlobalState) => state.auth;

export default AppBar;
