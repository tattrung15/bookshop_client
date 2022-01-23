import { Box, Breadcrumbs, Grid, Typography } from "@mui/material";
import { NavigateNext as NavigateNextIcon } from "@mui/icons-material";
import { useLayoutEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { useStyles } from "./make-style";
import { GlobalState } from "@app/store";
import { useSelector } from "react-redux";
import UserService from "@app/services/http/user.service";
import useObservable from "@core/hooks/use-observable.hook";
import { User } from "@app/models/user.model";

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

  useLayoutEffect(() => {
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
                    {!!currentUser &&
                      currentUser?.firstName + " " + currentUser?.lastName}
                  </Typography>
                  <Typography
                    color="textPrimary"
                    style={{ fontWeight: "bolder" }}
                  >
                    Tiền:{" "}
                    {!!currentUser && currentUser?.amount?.toLocaleString("vn")}
                    đ
                  </Typography>
                  <Box>
                    <ul style={{ listStyle: "none" }}>
                      <li style={{ marginTop: "1em" }}>
                        <NavLink
                          className={classes.navLink}
                          to="/profile"
                          style={handleLinkActiving}
                        >
                          <i
                            className="fa fa-edit"
                            style={{
                              fontSize: "larger",
                              marginRight: "0.3em",
                            }}
                          ></i>{" "}
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
                            className="fa fa-list-alt"
                            style={{
                              fontSize: "larger",
                              marginRight: "0.5em",
                            }}
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
                            className="fa fa-money-bill"
                            style={{
                              fontSize: "larger",
                              marginRight: "0.3em",
                            }}
                          ></i>{" "}
                          Nạp tiền
                        </NavLink>
                      </li>
                    </ul>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={9} md={9}>
            {/* <Switch>
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
              <Route path="/profile/don-hang">
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
              </Route>
              <Route path="/profile/recharge">
                <Box style={{ padding: "1em 1em 1em 0" }}>
                  <Box
                    style={{
                      boxShadow: "1px 0px 3px 1px #888888",
                      borderLeft: "1px solid black",
                    }}
                  >
                    <Box style={{ padding: "0.5em" }}>
                      <Typography variant="h4" component="h2" gutterBottom>
                        Liên hệ số điện thoại: 0396 500 575
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Route>
            </Switch> */}
          </Grid>
        </Box>
      </Box>
    </>
  );
}

const selectAuth = (state: GlobalState) => state.auth;

export default Profile;
