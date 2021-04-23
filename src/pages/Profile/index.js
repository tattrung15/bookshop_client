import React, { useEffect, useState } from "react";

import {
  Switch,
  Route,
  useHistory,
  Redirect,
  Link,
  NavLink,
} from "react-router-dom";

import clsx from "clsx";

import {
  Box,
  Breadcrumbs,
  Container,
  makeStyles,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";

import ListUserComponent from "../../components/ListUsers/ListUserComponent";

import AppBar from "../../components/AppBar";
import ProfileComponent from "../../components/Profile";

import { useRecoilState } from "recoil";
import { userSeletor } from "../../recoil/userState";

import { auth } from "../../utils/auth";
import { validateToken } from "../../api/authAPI";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { fetchUserById } from "../../api/usersService";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  linkA: {
    textDecoration: "none",
    color: "black",
  },
}));

export default function Profile() {
  const classes = useStyles();
  const history = useHistory();

  const [userState, setUserState] = useRecoilState(userSeletor);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    if (userState.userId) {
      fetchUserById(userState.userId)
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userState.userId]);

  const onUpdateSuccess = () => {
    if (userState.userId) {
      fetchUserById(userState.userId)
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <Box paddingTop={2} maxWidth="1200px" style={{ margin: "0 auto" }}>
        <Box paddingX={5.5} maxWidth="930px" style={{ margin: "0 auto" }}>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
            style={{ background: "#EBE9E9", padding: "0.5em" }}
          >
            <Link color="inherit" to="/">
              Trang chủ
            </Link>
            <Typography color="textPrimary">Thông tin tài khoản</Typography>
          </Breadcrumbs>
        </Box>
        <Box paddingTop={2} style={{ display: "flex" }}>
          <Grid item xs={3} md={3}>
            <Box style={{ padding: "1em 0 1em 1em" }}>
              <Box style={{ boxShadow: "-1px 0px 3px 1px #888888" }}>
                <Box style={{ padding: "0.5em" }}>
                  <Typography
                    color="textPrimary"
                    style={{ fontWeight: "bolder" }}
                  >
                    {currentUser &&
                      currentUser.firstName + " " + currentUser.lastName}
                  </Typography>
                  <Box>
                    <ul style={{ listStyle: "none" }}>
                      <li style={{ marginTop: "1em" }}>
                        <NavLink
                          className={classes.linkA}
                          to="/profile"
                          activeStyle={{
                            fontWeight: "bold",
                            color: "red",
                          }}
                          exact
                        >
                          <i
                            className="fa fa-edit"
                            style={{
                              fontSize: "larger",
                              marginRight: "0.5em",
                            }}
                          ></i>{" "}
                          Thông tin tài khoản
                        </NavLink>
                      </li>
                      <li style={{ marginTop: "1em" }}>
                        <NavLink
                          className={classes.linkA}
                          to="/profile/don-hang"
                          activeStyle={{
                            fontWeight: "bold",
                            color: "red",
                          }}
                          exact
                        >
                          <i
                            className="fa fa-list-alt"
                            style={{
                              fontSize: "larger",
                              marginRight: "0.5em",
                            }}
                          ></i>{" "}
                          Đơn hàng
                        </NavLink>
                      </li>
                    </ul>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={9} md={9}>
            <Switch>
              <Route path="/profile" exact>
                <Box style={{ padding: "1em 1em 1em 0" }}>
                  <Box
                    style={{
                      boxShadow: "1px 0px 3px 1px #888888",
                      borderLeft: "1px solid black",
                    }}
                  >
                    <Box style={{ padding: "0.5em" }}>
                      <ProfileComponent onUpdateSuccess={onUpdateSuccess} />
                    </Box>
                  </Box>
                </Box>
              </Route>
              <Route path="/profile/don-hang" exact>
                <Box style={{ padding: "1em 1em 1em 0" }}>
                  <Box
                    style={{
                      boxShadow: "4px 0px 3px 1px #888888",
                      borderLeft: "1px solid black",
                    }}
                  >
                    <Box style={{ padding: "0.5em" }}>b</Box>
                  </Box>
                </Box>
              </Route>
            </Switch>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
