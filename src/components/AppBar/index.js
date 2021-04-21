import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import clsx from "clsx";
import { fade, makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Badge,
  MenuItem,
  Menu,
  Icon,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  Chip,
  Box,
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import MoreIcon from "@material-ui/icons/MoreVert";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

import { useRecoilState } from "recoil";
import { userSeletor } from "../../recoil/userState";
import { cartSeletor } from "../../recoil/cartState";

import { fetchOrderItemsByUserId } from "../../api/cartService";

import { auth } from "../../utils/auth";

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  grow: {
    flexGrow: 1,
    position: "sticky",
    top: 0,
    left: 0,
    zIndex: 999,
    width: "100%",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "50ch",
    },
    [theme.breakpoints.down("sm")]: {
      width: "30ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));

export default function PrimarySearchAppBar() {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const [state, setState] = useState({ left: false });
  const [userState, setUserState] = useRecoilState(userSeletor);
  const [cartState, setCartState] = useRecoilState(cartSeletor);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const history = useHistory();

  useEffect(() => {
    if (userState.userId) {
      fetchOrderItemsByUserId(userState.userId)
        .then((data) => {
          setCartState({
            numberOfProducts: data.length,
          });
        })
        .catch((err) => {
          setCartState({
            numberOfProducts: 0,
          });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userState]);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMenuLogout = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    auth.logout();
    setUserState({
      userId: null,
      username: null,
      token: null,
      isAdmin: null,
    });
    history.push("/");
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
      {userState.isAdmin && (
        <Link to="/admin" style={{ color: "black", textDecoration: "none" }}>
          <MenuItem onClick={handleMenuClose}>Dashboard</MenuItem>
        </Link>
      )}
      {userState.username && (
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
      {!userState.username && (
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
          {userState.userId && (
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
          )}
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
          {userState.username && (
            <Box>
              <Avatar className={classes.small}>
                {userState.username.substring(0, 1).toUpperCase()}
              </Avatar>
            </Box>
          )}
          {!userState.username && <Icon className="fa fa-user" />}
        </IconButton>
        {userState.username && <p>{userState.username}</p>}
        {!userState.username && <p>Đăng nhập</p>}
      </MenuItem>
    </Menu>
  );

  const list = (anchor) => (
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

  const toggleDrawer = (anchor, open) => (event) => {
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
      <AppBar position="static">
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
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {userState.userId && (
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
                    badgeContent={cartState.numberOfProducts}
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
              {userState.username && (
                <Chip
                  style={{ cursor: "pointer" }}
                  label={userState.username}
                  avatar={
                    <Avatar>
                      {userState.username.substring(0, 1).toUpperCase()}
                    </Avatar>
                  }
                />
              )}
              {!userState.username && <Icon className="fa fa-user" />}
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
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
