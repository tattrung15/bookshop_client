import { Box, Breadcrumbs, Grid, Paper, Typography } from "@material-ui/core";
import { NavigateNext as NavigateNextIcon } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { Link, NavLink, Route, Routes } from "react-router-dom";
import clsx from "clsx";
import { useStyles } from "./make-style";
import { GlobalState } from "@app/store";
import { useSelector } from "react-redux";
import UserService from "@app/services/http/user.service";
import useObservable from "@core/hooks/use-observable.hook";
import { User } from "@app/models/user.model";
import ProfileForm from "@app/components/profile-form";
import AppBar from "@app/components/app-bar";

const handleLinkActiving = ({ isActive }) => {
  return isActive
    ? {
        fontWeight: "bold",
        color: "red",
      }
    : {};
};

function Profile() {
  const classes = useStyles();

  const { subscribeOnce } = useObservable();

  const { id: userId } = useSelector(selectAuth);
  const [currentUser, setCurrentUser] = useState<User>(new User(null));

  useEffect(() => {
    subscribeOnce(UserService.getUserById(userId), (data) => {
      setCurrentUser(data);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  // const onUpdateSuccess = () => {
  //   if (userState.userId) {
  //     fetchUserById(userState.userId)
  //       .then((data) => {
  //         setCurrentUser(data);
  //       })
  //       .catch((err) => {});
  //   }
  // };

  return (
    <>
      <AppBar />
      <Box paddingTop={2} className={classes.container}>
        <Box paddingX={5.5} className={classes.wrapBreadcrumb}>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
            className={classes.breadcrumb}
          >
            <Link color="inherit" to="/">
              Trang chủ
            </Link>
            <Typography color="textPrimary">Thông tin tài khoản</Typography>
          </Breadcrumbs>
        </Box>
        <Box paddingTop={2} style={{ display: "flex" }}>
          <Grid item xs={3} md={3} style={{ marginRight: "1em" }}>
            <Paper>
              <Box className={classes.menuLeft}>
                <Typography
                  color="textPrimary"
                  style={{ fontWeight: "bolder" }}
                >
                  {!!currentUser &&
                    currentUser?.firstName + " " + currentUser?.lastName}
                </Typography>
                <Typography
                  color="textPrimary"
                  style={{ fontWeight: "bolder" }}
                >
                  Tiền:{" "}
                  {!!currentUser && currentUser?.amount?.toLocaleString("vn")}đ
                </Typography>
                <Box>
                  <ul style={{ listStyle: "none" }}>
                    <li style={{ marginTop: "1em" }}>
                      <NavLink
                        className={classes.navLink}
                        to="/profile"
                        style={handleLinkActiving}
                        end
                      >
                        <i className={clsx("fa fa-edit", classes.menuIcon)}></i>{" "}
                        Thông tin tài khoản
                      </NavLink>
                    </li>
                    <li style={{ marginTop: "1em" }}>
                      <NavLink
                        className={classes.navLink}
                        to="/profile/don-hang"
                        style={handleLinkActiving}
                      >
                        <i
                          className={clsx("fa fa-list-alt", classes.menuIcon)}
                        ></i>{" "}
                        Đơn hàng
                      </NavLink>
                    </li>
                    <li style={{ marginTop: "1em" }}>
                      <NavLink
                        className={classes.navLink}
                        to="/profile/recharge"
                        style={handleLinkActiving}
                      >
                        <i
                          className={clsx("fa fa-money-bill", classes.menuIcon)}
                        ></i>{" "}
                        Nạp tiền
                      </NavLink>
                    </li>
                  </ul>
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={9} md={9}>
            <Routes>
              <Route path="" element={<ProfileForm />} />
              {/* <Route path="don-hang">
                <Box style={{ padding: "1em 1em 1em 0" }}>
                  <Box
                    style={{
                      boxShadow: "1px 0px 3px 1px #888888",
                      borderLeft: "1px solid black",
                    }}
                  >
                    <Box style={{ padding: "0.5em" }}>
                      <OrderClient />
                    </Box>
                  </Box>
                </Box>
              </Route> */}
              <Route
                path="recharge"
                element={
                  <Box style={{ padding: "1em 1em 1em 0" }}>
                    <Paper>
                      <Box style={{ padding: "0.5em" }}>
                        <Typography variant="h4" component="h2" gutterBottom>
                          Liên hệ số điện thoại: 0396 500 ***
                        </Typography>
                      </Box>
                    </Paper>
                  </Box>
                }
              ></Route>
            </Routes>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

const selectAuth = (state: GlobalState) => state.auth;

export default Profile;
