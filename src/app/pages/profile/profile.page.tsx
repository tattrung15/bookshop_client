import React, { useEffect, useState } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import { Box, Grid, Paper, Tooltip, Typography } from "@material-ui/core";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import { useStyles } from "./make-style";
import { GlobalState } from "@app/store";
import UserService from "@app/services/http/user.service";
import useObservable from "@core/hooks/use-observable.hook";
import { User } from "@app/models/user.model";
import ProfileForm from "@app/components/profile-form";
import AppBar from "@app/components/app-bar";
import CustomBreadcrumbs from "@app/components/custom-breadcrumbs";
import OrderInfo from "../order-info";
import { DELIVERY_STATE } from "@app/shared/constants/common";

const handleLinkActiving = ({ isActive }: { isActive: boolean }) => {
  return isActive
    ? {
        fontWeight: "bold",
        color: "red",
      }
    : {};
};

const TypographyPrimary: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = (props) => {
  return (
    <Typography noWrap color="textPrimary" {...props}>
      {props.children}
    </Typography>
  );
};

function Profile() {
  const classes = useStyles();

  const { subscribeOnce } = useObservable();

  const { id: userId } = useSelector(selectAuth);
  const [currentUser, setCurrentUser] = useState<User>(new User(null));

  useEffect(() => {
    if (userId) {
      subscribeOnce(UserService.getUserById(userId), (data) => {
        setCurrentUser(data);
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const onUpdateSuccess = () => {
    if (userId) {
      subscribeOnce(UserService.getUserById(userId), (data) => {
        setCurrentUser(data);
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Hồ sơ</title>
      </Helmet>
      <AppBar />
      <Box paddingTop={2} className={classes.container}>
        <CustomBreadcrumbs
          navigation={[{ title: "Trang chủ", linkTo: "/" }]}
          textPrimary="Thông tin tài khoản"
        />
        <Box paddingTop={2} style={{ display: "flex" }}>
          <Grid item xs={3} md={3} style={{ marginRight: "1em" }}>
            <Paper>
              <Box className={classes.menuLeft}>
                <Tooltip
                  title={
                    !!currentUser.id &&
                    currentUser?.firstName + " " + currentUser?.lastName
                  }
                  placement="top-start"
                  arrow
                  classes={{ tooltip: classes.customWidth }}
                >
                  <span>
                    <TypographyPrimary className={classes.typographyBolder}>
                      {!!currentUser.id &&
                        currentUser?.firstName + " " + currentUser?.lastName}
                    </TypographyPrimary>
                  </span>
                </Tooltip>
                <TypographyPrimary className={classes.typographyBolder}>
                  Tiền:{" "}
                  {!!currentUser.id &&
                    currentUser?.amount?.toLocaleString("vn") + "đ"}
                </TypographyPrimary>
                <Box>
                  <ul style={{ listStyle: "none" }}>
                    <li className={classes.itemNavLink}>
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
                    <li className={classes.itemNavLink}>
                      <NavLink
                        className={classes.navLink}
                        to={`/profile/order?state=${DELIVERY_STATE.WAITING_TO_CONFIRM}`}
                        style={handleLinkActiving}
                      >
                        <i
                          className={clsx("fa fa-list-alt", classes.menuIcon)}
                        ></i>{" "}
                        Đơn hàng
                      </NavLink>
                    </li>
                    <li className={classes.itemNavLink}>
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
              <Route
                path=""
                element={<ProfileForm onUpdateSuccess={onUpdateSuccess} />}
              />
              <Route
                path="order"
                element={
                  <Box style={{ padding: "1em 1em 1em 0" }}>
                    <Paper>
                      <Box style={{ padding: "0.5em" }}>
                        <OrderInfo />
                      </Box>
                    </Paper>
                  </Box>
                }
              />
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
